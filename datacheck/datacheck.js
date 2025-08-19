#!/usr/bin/env node
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */

/* eslint-disable complexity */
/**
 * Node.js (ESM) port of the original Python datacheck script.
 * Checks OpenStreetMap place data and produces validation / issue output.
 * Original Python logic preserved as close as practical.
 */
import OpeningHours from "opening_hours";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import path from "node:path";
import process from "node:process";
import validator from "email-validator";

// ---------------- Constants ----------------
const TIMESTAMP = new Date().toISOString();
const DATE = TIMESTAMP.slice(0, 10); // YYYY-MM-DD
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, "..", "data");
const OVERPASS_FILE = path.join(DATA_PATH, "overpass.json");
const VEGGIEPLACES_CHECK_RESULT_FILE = path.join(DATA_PATH, "check_results.json");
const URL_DATA_FILE = path.join(DATA_PATH, "urldata.json");

const MAX_URL_CHECKS = 100; // Limit external requests
const MIN_URL_CHECK_AGE = 50; // Days before re-checking a URL
const HTTP_TIMEOUT_MS = 3000; // Shorter timeout for speed
const FETCH_CONCURRENCY = 25; // Higher concurrency for network phase
const SKIP_FULL_CHECK_DOMAINS = ["instagram.com", "www.instagram.com", "facebook.com", "www.facebook.com"]; // Heavy domains -> skip network

const REQUEST_HEADERS = {
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) VeggieKarteDatacheck/1.0 Safari/537.36"
};

class Processor {
  counter = 0;
  urlData = {}; // Plain object cache
}
const proc = new Processor();

async function readJson(file) {
  try {
    const txt = await fs.readFile(file, "utf-8");
    return JSON.parse(txt);
  }
  catch (err) {
    if (err.code === "ENOENT") {
      return null;
    }
    throw err;
  }
}

async function writeJson(file, obj) {
  const txt = JSON.stringify(obj, null, 1);
  await fs.writeFile(file, txt, "utf-8");
}

function isUrlFormatValid(url) {
  try {
    const parsed = new URL(url);
    return Boolean(parsed.protocol && parsed.hostname);
  }
  catch {
    return false;
  }
}

async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HTTP_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...opts, signal: controller.signal, headers: REQUEST_HEADERS });
    return response;
  }
  catch (err) {
    if (err.name === "AbortError") {
      return { status: 499, aborted: true };
    }
    // Convert all errors into synthetic failed response object to avoid throwing upstream
    return { status: 598, error: err };
  }
  finally {
    clearTimeout(timeout);
  }
}

async function isUrlOk(url) {
  const result = { date: DATE };
  if (Object.hasOwn(proc.urlData, url)) {
    const cachedResult = proc.urlData[url];
    result.isOk = cachedResult.isOk;
    result.text = cachedResult.text;
    return result;
  }
  // Quick skip for known heavy social media hosts
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (SKIP_FULL_CHECK_DOMAINS.includes(host)) {
      result.isOk = true;
      result.text = "Skipped domain - assumed OK";
      proc.urlData[url] = result;
      return result;
    }
  }
  catch { /* Ignore parse errors here */ }
  if (!isUrlFormatValid(url)) {
    result.isOk = false;
    result.text = "No valid URL format";
  }
  else if (proc.counter >= MAX_URL_CHECKS) {
    result.isOk = true;
    result.text = "Not checked";
  }
  else {
    try {
      // Try lightweight HEAD first
      let response = await fetchWithTimeout(url, { method: "HEAD" });
      if (response.status === 405 || response.status === 501) {
        // Server does not allow HEAD -> retry with GET
        response = await fetchWithTimeout(url, { method: "GET" });
      }
      if (response.status < 400) {
        result.isOk = true;
        result.text = "OK";
      }
      else if (response.status === 403) {
        result.isOk = true;
        result.text = "Can't do full check: HTTP response: Forbidden";
      }
      else if (response.status === 429) {
        result.isOk = true;
        result.text = "Can't do full check: HTTP response: Too Many Requests";
      }
      else if (response.status === 499) {
        result.isOk = true; // Treat aborted (timeout) as soft-ok to not flood issues
        result.text = "Timeout (soft pass)";
      }
      else if (response.status === 598) {
        result.isOk = false;
        result.text = `Network error: ${response.error?.name || "Unknown"}`;
      }
      else {
        result.isOk = false;
        result.text = "HTTP response error";
        console.log(url, response.status);
      }
      result.text = `${result.text} - ${response.status}`;
      proc.counter += 1;
    }
    catch (err) {
      result.isOk = false;
      result.text = `Exception: ${err.name}`;
      console.log(url, result.text);
    }
  }
  proc.urlData[url] = result;
  return result;
}

// Run tasks with concurrency limit
async function runWithLimit(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;
  async function next() {
    const current = index;
    if (current >= items.length) { return; }
    index += 1;
    try {
      results[current] = await worker(items[current], current);
    }
    catch (err) {
      results[current] = { error: err };
    }
    next();
  }
  const starters = Array.from({ length: Math.min(limit, items.length) }, () => next());
  await Promise.all(starters);
  return results;
}

// Collect unique URLs needing checks (excluding already cached or skipped)
function collectUrls(elements) {
  const urls = new Set();
  for (const el of elements) {
    const tags = el.tags || {};
    ["contact:website", "website", "contact:facebook", "contact:instagram"].forEach((tag) => {
      if (tag in tags) {
        let tagValue = tags[tag];
        if (tag === "contact:facebook" && !tagValue.startsWith("http")) { tagValue = `https://www.facebook.com/${tagValue}`; }
        if (tag === "contact:instagram" && !tagValue.startsWith("http")) { tagValue = `https://www.instagram.com/${tagValue}`; }
        if (!Object.hasOwn(proc.urlData, tagValue)) {
          urls.add(tagValue);
        }
      }
    });
  }
  return Array.from(urls);
}

function normalizeName(name) {
  return name.replace(/"/gu, "”");
}
function validateEmailAddress(email) {
  return validator.validate(email);
}

function checkPhoneNumber(issueCollector, tagName, tags) {
  const raw = tags[tagName] || "";
  const invalidChars = raw.replace(/[0-9 +;-]/gu, "");
  if (invalidChars.length) {
    issueCollector.push(`'${tagName}' contains characters that are not allowed: '${invalidChars}'`);
  }
  const first = raw.split(";")[0];
  try {
    const phoneNumber = parsePhoneNumberFromString(first);
    if (!phoneNumber || !phoneNumber.isValid()) {
      issueCollector.push(`'${tagName}': Validation of number '${first}' failed. Is this number correct?.`);
      return;
    }
    const intl = phoneNumber.formatInternational();
    const e164 = phoneNumber.format("E.164");
    const rfc3966 = phoneNumber.format("RFC3966").replace("tel:", "");
    if (![intl, e164, rfc3966].includes(first)) {
      issueCollector.push(`'${tagName}' does not conform to the ITU-T E.123, E.164 or RFC 3966 pattern. It's '${first}' but '${intl}' (E.123) is recommended.`);
    }
  }
  catch (err) {
    issueCollector.push(`'${tagName}' not corresponds to the ITU-T E.123, E.164 nor RFC 3966 pattern - Error message: ${err.message}`);
  }
}

function checkOpeningHours(openingHoursValue, issues) {
  if (openingHoursValue.includes("\n") || openingHoursValue.includes("\r")) {
    issues.push("There is a line break in 'opening_hours' -> remove");
  }
  if (openingHoursValue.includes("SH")) {
    return;
  }
  try {
    const opening = new OpeningHours(openingHoursValue);
    const warnings = opening.getWarnings?.() || [];
    warnings.forEach(warning => issues.push(`opening_hours: ${warning}`));
  }
  catch (err) {
    issues.push(`opening_hours: ${err.message}`);
  }
}

function sortByIssueCount(features) {
  return features.sort((featureA, featureB) => featureB.properties.issue_count - featureA.properties.issue_count);
}
function containsDisused(tags) {
  return Object.entries(tags).some(([key, value]) => `${key}=${value}`.includes("disused"));
}

async function checkData(osmData) {
  const features = [];
  const elements = osmData?.elements || [];
  const total = elements.length;

  // Phase 1: batch URL checks
  const urlsToCheck = collectUrls(elements);
  const limitedList = urlsToCheck.slice(0, MAX_URL_CHECKS); // Enforce cap
  await runWithLimit(limitedList, FETCH_CONCURRENCY, url => isUrlOk(url));

  // Phase 2: element processing using cached results
  for (let index = 0; index < total; index += 1) {
    const osmElement = elements[index];
    const elementId = osmElement.id;
    const elementType = osmElement.type;
    const tags = osmElement.tags || {};
    process.stdout.write(`${index + 1} / ${total}\r`);
    let lat;
    let lon;
    if (elementType === "node") {
      lat = osmElement.lat;
      lon = osmElement.lon;
    }
    else if (elementType === "way" || elementType === "relation") {
      const center = osmElement.center || {};
      lat = center.lat;
      lon = center.lon;
    }
    const properties = { _id: elementId, _type: elementType, undefined: [], issues: [] };
    const geometry = { type: "Point", coordinates: [lon, lat] };
    let name = tags.name || tags["name:en"] || (tags.amenity === "vending_machine" ? "vending machine" : `${elementType} ${elementId}`);
    if (!tags.name) { properties.undefined.push("name"); }
    name = normalizeName(name);
    properties.name = name;
    if ("diet:vegan" in tags) {
      const dietVegan = tags["diet:vegan"];
      properties.diet_vegan = dietVegan;
      if (!["only", "yes", "limited", "no"].includes(dietVegan)) {
        properties.issues.push(`'diet:vegan' has an unusual value: ${dietVegan}`);
      }
      else if ("diet:vegetarian" in tags && dietVegan === "only") {
        const dietVegetarian = tags["diet:vegetarian"];
        if (dietVegetarian !== "only") { properties.issues.push("'diet:vegan' is 'only' then 'diet:vegetarian' is unneccessary or should be 'only' too."); }
      }
    }
    else {
      properties.undefined.push("diet:vegan");
    }
    if (tags["diet:vegan"] !== "no") {
      if (!("cuisine" in tags) && !("shop" in tags)) {
        if (!["cafe", "ice_cream", "bar"].includes(tags.amenity || "")) { properties.undefined.push("cuisine"); }
      }
      if ("cuisine" in tags) {
        const cuisine = tags.cuisine;
        if (cuisine.includes("vegan")) { properties.issues.push("There is 'vegan' in the cuisine tag. Remove it and create a 'diet:vegan' tag if there is none."); }
        if (cuisine.includes("vegetarian")) { properties.issues.push("There is 'vegetarian' in the cuisine tag. Remove it and create a 'diet:vegetarian' tag if there is none."); }
      }
      let website = "undefined";
      if ("contact:website" in tags) {
        website = tags["contact:website"];
        const check = await isUrlOk(website);
        if (!check.isOk) { properties.issues.push(`'contact:website' ${check.text}`); }
      }
      if ("website" in tags) {
        website = tags.website;
        const check = await isUrlOk(website);
        if (!check.isOk) { properties.issues.push(`'website' ${check.text}`); }
      }
      if (website.includes("facebook")) { properties.issues.push("'facebook' URI as website -> change to 'contact:facebook'"); }
      if (website.includes("instagram")) { properties.issues.push("'instagram' URI as website -> change to 'contact:instagram'"); }
      if ("contact:website" in tags && "website" in tags) { properties.issues.push("'website' and 'contact:website' defined -> remove one"); }
      if ("contact:facebook" in tags) {
        let contactFacebook = tags["contact:facebook"];
        if (contactFacebook.startsWith("http://")) {
          properties.issues.push("'contact:facebook' starts with 'http' instead of 'https'");
        }
        else if (contactFacebook.startsWith("https://")) {
          if (contactFacebook.startsWith("https://www.facebook.com/") || contactFacebook.startsWith("https://facebook.com/")) {
            const check = await isUrlOk(contactFacebook);
            if (!check.isOk) { properties.issues.push(`'contact:facebook' ${check.text}`); }
          }
          else {
            properties.issues.push("'contact:facebook' should start with 'https://www.facebook.com/'");
          }
        }
        else {
          contactFacebook = `https://www.facebook.com/${contactFacebook}`;
          const check = await isUrlOk(contactFacebook);
          if (!check.isOk) { properties.issues.push(`'contact:facebook' ${check.text}`); }
        }
      }
      if ("facebook" in tags) { properties.issues.push("old tag: 'facebook' -> change to 'contact:facebook'"); }
      if ("contact:instagram" in tags) {
        let contactInstagram = tags["contact:instagram"];
        if (contactInstagram.startsWith("http://")) {
          properties.issues.push("'contact:instagram' starts with 'http' instead of 'https'");
        }
        else if (contactInstagram.startsWith("https://")) {
          if (contactInstagram.startsWith("https://www.instagram.com/") || contactInstagram.startsWith("https://instagram.com/")) {
            const check = await isUrlOk(contactInstagram);
            if (!check.isOk) { properties.issues.push(`'contact:instagram' ${check.text}`); }
          }
          else {
            properties.issues.push("'contact:instagram' should start with 'https://www.instagram.com/'");
          }
        }
        else {
          contactInstagram = `https://www.instagram.com/${contactInstagram}`;
          const check = await isUrlOk(contactInstagram);
          if (!check.isOk) { properties.issues.push(`'contact:instagram' ${check.text}`); }
        }
      }
      if ("instagram" in tags) { properties.issues.push("old tag 'instagram' -> change to 'contact:instagram'"); }
      let email;
      if ("contact:email" in tags) { email = tags["contact:email"]; }
      else if ("email" in tags) { email = tags.email; }
      if (email) {
        email = email.split(";")[0];
        if (!validateEmailAddress(email)) { properties.issues.push(`E-Mail is not valid: ${email}`); }
      }
      if ("contact:email" in tags && "email" in tags) { properties.issues.push("'email' and 'contact:email' defined -> remove one"); }
      ["contact:phone", "contact:mobile", "phone"].forEach((tag) => {
        if (tag in tags) { checkPhoneNumber(properties.issues, tag, tags); }
      });
      if ("contact:phone" in tags && "phone" in tags) { properties.issues.push("'phone' and 'contact:phone' defined -> remove one"); }
      if ("mobile" in tags) { properties.issues.push("'mobile' tag is not an official tag and should therefore not be used. -> change it to 'contact:mobile'"); }
      let openingHours = "undefined";
      if ("opening_hours:covid19" in tags && !["same", "restricted"].includes(tags["opening_hours:covid19"])) { openingHours = tags["opening_hours:covid19"]; }
      else if ("opening_hours" in tags) { openingHours = tags.opening_hours; }
      else { properties.undefined.push("opening_hours"); }
      if (openingHours !== "undefined") { checkOpeningHours(openingHours, properties.issues); }
      if (containsDisused(tags)) { properties.issues.push("There is a 'disused' tag: Check whether this tag is correct. If so please remove the diet tags."); }
      if ("fixme" in tags) { properties.issues.push(`fixme: ${tags.fixme}`); }
    }
    properties.issue_count = properties.issues.length + properties.undefined.length;
    if (!properties.issues.length) { delete properties.issues; }
    if (!properties.undefined.length) { delete properties.undefined; }
    if (properties.issue_count > 0) { features.push({ type: "Feature", properties, geometry }); }
  }
  process.stdout.write(`\n${total} elements.\n`);
  return { _timestamp: TIMESTAMP, type: "FeatureCollection", features: sortByIssueCount(features) };
}

async function loadAndPruneUrlData() {
  const data = (await readJson(URL_DATA_FILE)) || {};
  const today = new Date(DATE);
  for (const url of Object.keys(data)) {
    try {
      const date = new Date(data[url].date);
      const deltaDays = (today - date) / 86400000;
      if (deltaDays > MIN_URL_CHECK_AGE) { delete data[url]; }
    }
    catch { delete data[url]; }
  }
  return data;
}

async function main() {
  proc.urlData = await loadAndPruneUrlData();
  const osmData = await readJson(OVERPASS_FILE);
  if (!osmData) {
    console.error("A problem has occurred. osm_data is None");
    process.exitCode = 1;
    return;
  }
  const checkResult = await checkData(osmData);
  await writeJson(VEGGIEPLACES_CHECK_RESULT_FILE, checkResult);
  await writeJson(URL_DATA_FILE, proc.urlData);
}

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection suppressed:", reason);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("datacheck failed:", err);
    process.exit(1);
  });
}
