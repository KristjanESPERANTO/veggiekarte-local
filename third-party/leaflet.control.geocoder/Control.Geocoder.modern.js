var N = Object.defineProperty;
var M = (a, t, n) => t in a ? N(a, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : a[t] = n;
var p = (a, t, n) => M(a, typeof t != "symbol" ? t + "" : t, n);
import * as s from "leaflet";
function u(a, t) {
  return s.Util.extend(t, a.geocodingQueryParams);
}
function h(a, t) {
  return s.Util.extend(t, a.reverseQueryParams);
}
const j = /[&<>"'`]/g, A = /[&<>"'`]/, G = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
function W(a) {
  return G[a];
}
function I(a) {
  return a == null ? "" : a ? (a = "" + a, A.test(a) ? a.replace(j, W) : a) : a + "";
}
function d(a, t) {
  const n = { Accept: "application/json" }, e = new URL(a);
  return Object.entries(t).forEach(([o, i]) => {
    (Array.isArray(i) ? i : [i]).forEach((r) => {
      e.searchParams.append(o, r);
    });
  }), fetch(e.toString(), { headers: n }).then((o) => o.json());
}
function z(a, t) {
  return a.replace(/\{ *([\w_]+) *\}/g, (n, e) => {
    let o = t[e];
    return o === void 0 ? o = "" : typeof o == "function" && (o = o(t)), I(o);
  });
}
class L {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
      apiKey: ""
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const n = u(this.options, {
      token: this.options.apiKey,
      SingleLine: t,
      outFields: "Addr_Type",
      forStorage: !1,
      maxLocations: 10,
      f: "json"
    }), e = await d(
      this.options.serviceUrl + "/findAddressCandidates",
      n
    ), o = [];
    if (e.candidates && e.candidates.length)
      for (let i = 0; i <= e.candidates.length - 1; i++) {
        const r = e.candidates[i], l = s.latLng(r.location.y, r.location.x), c = s.latLngBounds(
          s.latLng(r.extent.ymax, r.extent.xmax),
          s.latLng(r.extent.ymin, r.extent.xmin)
        );
        o[i] = {
          name: r.address,
          bbox: c,
          center: l
        };
      }
    return o;
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, n) {
    const e = h(this.options, {
      location: t.lng + "," + t.lat,
      distance: 100,
      f: "json"
    }), o = await d(this.options.serviceUrl + "/reverseGeocode", e), i = [];
    if (o && !o.error) {
      const r = s.latLng(o.location.y, o.location.x), l = s.latLngBounds(r, r);
      i.push({
        name: o.address.Match_addr,
        center: r,
        bbox: l
      });
    }
    return i;
  }
}
function q(a) {
  return new L(a);
}
class y {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://dev.virtualearth.net/REST/v1/Locations/"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const n = u(this.options, {
      query: t,
      key: this.options.apiKey
    }), e = await d(this.options.serviceUrl, n), o = [];
    if (e.resourceSets.length > 0)
      for (let i = e.resourceSets[0].resources.length - 1; i >= 0; i--) {
        const r = e.resourceSets[0].resources[i], l = r.bbox;
        o[i] = {
          name: r.name,
          bbox: s.latLngBounds([l[0], l[1]], [l[2], l[3]]),
          center: s.latLng(r.point.coordinates)
        };
      }
    return o;
  }
  async reverse(t, n) {
    const e = h(this.options, {
      key: this.options.apiKey
    }), o = await d(
      this.options.serviceUrl + t.lat + "," + t.lng,
      e
    ), i = [];
    for (let r = o.resourceSets[0].resources.length - 1; r >= 0; r--) {
      const l = o.resourceSets[0].resources[r], c = l.bbox;
      i[r] = {
        name: l.name,
        bbox: s.latLngBounds([c[0], c[1]], [c[2], c[3]]),
        center: s.latLng(l.point.coordinates)
      };
    }
    return i;
  }
}
function H(a) {
  return new y(a);
}
class x {
  constructor(t) {
    p(this, "options", {
      apiKey: "",
      serviceUrl: "https://atlas.microsoft.com/search"
    });
    if (s.Util.setOptions(this, t), !this.options.apiKey)
      throw new Error("Azure Maps Geocoder requires an API key.");
  }
  /**
   * {@inheritdoc}
   * https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address?view=rest-maps-1.0&tabs=HTTP
   */
  async geocode(t) {
    const n = {
      "api-version": "1.0",
      query: t,
      "subscription-key": this.options.apiKey
    }, e = this.options.serviceUrl + "/address/json", o = await d(e, n), i = [];
    if (o.results && o.results.length > 0)
      for (const r of o.results)
        i.push({
          name: r.address.freeformAddress,
          bbox: s.latLngBounds(
            [r.viewport.topLeftPoint.lat, r.viewport.topLeftPoint.lon],
            [r.viewport.btmRightPoint.lat, r.viewport.btmRightPoint.lon]
          ),
          center: s.latLng(r.position.lat, r.position.lon)
        });
    return i;
  }
  /**
   * {@inheritdoc}
   * https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address-reverse?view=rest-maps-1.0&tabs=HTTP
   */
  async reverse(t, n) {
    const e = {
      "api-version": "1.0",
      query: t.lat + "," + t.lng,
      "subscription-key": this.options.apiKey
    }, o = this.options.serviceUrl + "/address/reverse/json", i = await d(o, e), r = [];
    if (i.addresses && i.addresses.length > 0)
      for (const l of i.addresses)
        r.push({
          name: l.address.freeformAddress,
          bbox: s.latLngBounds(
            [l.viewport.topLeftPoint.lat, l.viewport.topLeftPoint.lon],
            [l.viewport.btmRightPoint.lat, l.viewport.btmRightPoint.lon]
          ),
          center: s.latLng(t.lat, t.lng)
        });
    return r;
  }
}
function J(a) {
  return new x(a);
}
class w {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://maps.googleapis.com/maps/api/geocode/json"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const n = u(this.options, {
      key: this.options.apiKey,
      address: t
    }), e = await d(this.options.serviceUrl, n), o = [];
    if (e.results && e.results.length)
      for (let i = 0; i <= e.results.length - 1; i++) {
        const r = e.results[i], l = s.latLng(r.geometry.location), c = s.latLngBounds(
          s.latLng(r.geometry.viewport.northeast),
          s.latLng(r.geometry.viewport.southwest)
        );
        o[i] = {
          name: r.formatted_address,
          bbox: c,
          center: l,
          properties: r.address_components
        };
      }
    return o;
  }
  async reverse(t, n) {
    const e = h(this.options, {
      key: this.options.apiKey,
      latlng: t.lat + "," + t.lng
    }), o = await d(this.options.serviceUrl, e), i = [];
    if (o.results && o.results.length)
      for (let r = 0; r <= o.results.length - 1; r++) {
        const l = o.results[r], c = s.latLng(l.geometry.location), g = s.latLngBounds(
          s.latLng(l.geometry.viewport.northeast),
          s.latLng(l.geometry.viewport.southwest)
        );
        i[r] = {
          name: l.formatted_address,
          bbox: g,
          center: c,
          properties: l.address_components
        };
      }
    return i;
  }
}
function V(a) {
  return new w(a);
}
class U {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://geocoder.api.here.com/6.2/",
      app_id: "",
      app_code: "",
      apiKey: "",
      maxResults: 5
    });
    if (s.Util.setOptions(this, t), t != null && t.apiKey) throw Error("apiKey is not supported, use app_id/app_code instead!");
  }
  geocode(t) {
    const n = u(this.options, {
      searchtext: t,
      gen: 9,
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      jsonattributes: 1,
      maxresults: this.options.maxResults
    });
    return this.getJSON(this.options.serviceUrl + "geocode.json", n);
  }
  reverse(t, n) {
    let e = t.lat + "," + t.lng;
    this.options.reverseGeocodeProxRadius && (e += "," + this.options.reverseGeocodeProxRadius);
    const o = h(this.options, {
      prox: e,
      mode: "retrieveAddresses",
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      gen: 9,
      jsonattributes: 1,
      maxresults: this.options.maxResults
    });
    return this.getJSON(this.options.serviceUrl + "reversegeocode.json", o);
  }
  async getJSON(t, n) {
    const e = await d(t, n), o = [];
    if (e.response.view && e.response.view.length)
      for (let i = 0; i <= e.response.view[0].result.length - 1; i++) {
        const r = e.response.view[0].result[i].location, l = s.latLng(r.displayPosition.latitude, r.displayPosition.longitude), c = s.latLngBounds(
          s.latLng(r.mapView.topLeft.latitude, r.mapView.topLeft.longitude),
          s.latLng(r.mapView.bottomRight.latitude, r.mapView.bottomRight.longitude)
        );
        o[i] = {
          name: r.address.label,
          properties: r.address,
          bbox: c,
          center: l
        };
      }
    return o;
  }
}
class C {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://geocode.search.hereapi.com/v1",
      apiKey: "",
      app_id: "",
      app_code: "",
      maxResults: 10
    });
    s.Util.setOptions(this, t);
  }
  geocode(t) {
    const n = u(this.options, {
      q: t,
      apiKey: this.options.apiKey,
      limit: this.options.maxResults
    });
    if (!n.at && !n.in)
      throw Error(
        "at / in parameters not found. Please define coordinates (at=latitude,longitude) or other (in) in your geocodingQueryParams."
      );
    return this.getJSON(this.options.serviceUrl + "/discover", n);
  }
  reverse(t, n) {
    const e = h(this.options, {
      at: t.lat + "," + t.lng,
      limit: this.options.reverseGeocodeProxRadius,
      apiKey: this.options.apiKey
    });
    return this.getJSON(this.options.serviceUrl + "/revgeocode", e);
  }
  async getJSON(t, n) {
    const e = await d(t, n), o = [];
    if (e.items && e.items.length)
      for (let i = 0; i <= e.items.length - 1; i++) {
        const r = e.items[i], l = s.latLng(r.position.lat, r.position.lng);
        let c;
        r.mapView ? c = s.latLngBounds(
          s.latLng(r.mapView.south, r.mapView.west),
          s.latLng(r.mapView.north, r.mapView.east)
        ) : c = s.latLngBounds(
          s.latLng(r.position.lat, r.position.lng),
          s.latLng(r.position.lat, r.position.lng)
        ), o[i] = {
          name: r.address.label,
          properties: r.address,
          bbox: c,
          center: l
        };
      }
    return o;
  }
}
function $(a) {
  return a != null && a.apiKey ? new C(a) : new U(a);
}
function R(a) {
  let t;
  if (t = a.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/))
    return s.latLng(
      (/N/i.test(t[1]) ? 1 : -1) * +t[2],
      (/E/i.test(t[3]) ? 1 : -1) * +t[4]
    );
  if (t = a.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/))
    return s.latLng(
      (/N/i.test(t[2]) ? 1 : -1) * +t[1],
      (/E/i.test(t[4]) ? 1 : -1) * +t[3]
    );
  if (t = a.match(
    /^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/
  ))
    return s.latLng(
      (/N/i.test(t[1]) ? 1 : -1) * (+t[2] + +t[3] / 60),
      (/E/i.test(t[4]) ? 1 : -1) * (+t[5] + +t[6] / 60)
    );
  if (t = a.match(
    /^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/
  ))
    return s.latLng(
      (/N/i.test(t[3]) ? 1 : -1) * (+t[1] + +t[2] / 60),
      (/E/i.test(t[6]) ? 1 : -1) * (+t[4] + +t[5] / 60)
    );
  if (t = a.match(
    /^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/
  ))
    return s.latLng(
      (/N/i.test(t[1]) ? 1 : -1) * (+t[2] + +t[3] / 60 + +t[4] / 3600),
      (/E/i.test(t[5]) ? 1 : -1) * (+t[6] + +t[7] / 60 + +t[8] / 3600)
    );
  if (t = a.match(
    /^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/
  ))
    return s.latLng(
      (/N/i.test(t[4]) ? 1 : -1) * (+t[1] + +t[2] / 60 + +t[3] / 3600),
      (/E/i.test(t[8]) ? 1 : -1) * (+t[5] + +t[6] / 60 + +t[7] / 3600)
    );
  if (t = a.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/))
    return s.latLng(+t[1], +t[2]);
}
class E {
  constructor(t) {
    p(this, "options", {
      next: void 0,
      sizeInMeters: 1e4
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const n = R(t);
    return n ? [
      {
        name: t,
        center: n,
        bbox: n.toBounds(this.options.sizeInMeters)
      }
    ] : this.options.next ? this.options.next.geocode(t) : [];
  }
}
function F(a) {
  return new E(a);
}
class k {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    });
    s.Util.setOptions(this, t);
  }
  _getProperties(t) {
    const n = {
      text: t.text,
      address: t.address
    };
    for (let e = 0; e < (t.context || []).length; e++) {
      const o = t.context[e].id.split(".")[0];
      n[o] = t.context[e].text, t.context[e].short_code && (n.countryShortCode = t.context[e].short_code);
    }
    return n;
  }
  async geocode(t) {
    const n = this.options.serviceUrl + encodeURIComponent(t) + ".json", e = u(this.options, {
      access_token: this.options.apiKey
    });
    e.proximity !== void 0 && e.proximity.lat !== void 0 && e.proximity.lng !== void 0 && (e.proximity = e.proximity.lng + "," + e.proximity.lat);
    const o = await d(n, e);
    return this._parseResults(o);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, n) {
    const e = this.options.serviceUrl + t.lng + "," + t.lat + ".json", o = h(this.options, {
      access_token: this.options.apiKey
    }), i = await d(e, o);
    return this._parseResults(i);
  }
  _parseResults(t) {
    var e;
    if (!((e = t.features) != null && e.length))
      return [];
    const n = [];
    for (let o = 0; o <= t.features.length - 1; o++) {
      const i = t.features[o], r = s.latLng(i.center.reverse());
      let l;
      i.bbox ? l = s.latLngBounds(
        s.latLng(i.bbox.slice(0, 2).reverse()),
        s.latLng(i.bbox.slice(2, 4).reverse())
      ) : l = s.latLngBounds(r, r), n[o] = {
        name: i.place_name,
        bbox: l,
        center: r,
        properties: this._getProperties(i)
      };
    }
    return n;
  }
}
function Q(a) {
  return new k(a);
}
class D {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://www.mapquestapi.com/geocoding/v1"
    });
    s.Util.setOptions(this, t), this.options.apiKey = decodeURIComponent(this.options.apiKey);
  }
  _formatName(...t) {
    return t.filter((n) => !!n).join(", ");
  }
  async geocode(t) {
    const n = u(this.options, {
      key: this.options.apiKey,
      location: t,
      limit: 5,
      outFormat: "json"
    }), e = await d(this.options.serviceUrl + "/address", n);
    return this._parseResults(e);
  }
  async reverse(t, n) {
    const e = h(this.options, {
      key: this.options.apiKey,
      location: t.lat + "," + t.lng,
      outputFormat: "json"
    }), o = await d(this.options.serviceUrl + "/reverse", e);
    return this._parseResults(o);
  }
  _parseResults(t) {
    const n = [];
    if (t.results && t.results[0].locations)
      for (let e = t.results[0].locations.length - 1; e >= 0; e--) {
        const o = t.results[0].locations[e], i = s.latLng(o.latLng);
        n[e] = {
          name: this._formatName(o.street, o.adminArea4, o.adminArea3, o.adminArea1),
          bbox: s.latLngBounds(i, i),
          center: i
        };
      }
    return n;
  }
}
function X(a) {
  return new D(a);
}
class B {
  constructor(t) {
    p(this, "options", {
      userId: "",
      apiKey: "",
      serviceUrl: "https://neutrinoapi.com/"
    });
    s.Util.setOptions(this, t);
  }
  // https://www.neutrinoapi.com/api/geocode-address/
  async geocode(t) {
    const n = u(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      //get three words and make a dot based string
      address: t.split(/\s+/).join(".")
    }), e = await d(this.options.serviceUrl + "geocode-address", n), o = [];
    if (e.locations) {
      e.geometry = e.locations[0];
      const i = s.latLng(e.geometry.latitude, e.geometry.longitude), r = s.latLngBounds(i, i);
      o[0] = {
        name: e.geometry.address,
        bbox: r,
        center: i
      };
    }
    return o;
  }
  suggest(t) {
    return this.geocode(t);
  }
  // https://www.neutrinoapi.com/api/geocode-reverse/
  async reverse(t, n) {
    const e = h(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      latitude: t.lat,
      longitude: t.lng
    }), o = await d(this.options.serviceUrl + "geocode-reverse", e), i = [];
    if (o.status.status == 200 && o.found) {
      const r = s.latLng(t.lat, t.lng), l = s.latLngBounds(r, r);
      i[0] = {
        name: o.address,
        bbox: l,
        center: r
      };
    }
    return i;
  }
}
function Y(a) {
  return new B(a);
}
class f {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://nominatim.openstreetmap.org/",
      htmlTemplate(t) {
        const n = t.address;
        let e;
        const o = [];
        return (n.road || n.building) && o.push("{building} {road} {house_number}"), (n.city || n.town || n.village || n.hamlet) && (e = o.length > 0 ? "leaflet-control-geocoder-address-detail" : "", o.push(
          '<span class="' + e + '">{postcode} {city} {town} {village} {hamlet}</span>'
        )), (n.state || n.country) && (e = o.length > 0 ? "leaflet-control-geocoder-address-context" : "", o.push('<span class="' + e + '">{state} {country}</span>')), z(o.join("<br/>"), n);
      }
    });
    s.Util.setOptions(this, t || {});
  }
  async geocode(t) {
    const n = u(this.options, {
      q: t,
      limit: 5,
      format: "json",
      addressdetails: 1
    }), e = await d(this.options.serviceUrl + "search", n), o = [];
    for (let i = e.length - 1; i >= 0; i--) {
      const r = e[i].boundingbox;
      o[i] = {
        icon: e[i].icon,
        name: e[i].display_name,
        html: this.options.htmlTemplate ? this.options.htmlTemplate(e[i]) : void 0,
        bbox: s.latLngBounds([+r[0], +r[2]], [+r[1], +r[3]]),
        center: s.latLng(+e[i].lat, +e[i].lon),
        properties: e[i]
      };
    }
    return o;
  }
  async reverse(t, n) {
    const e = h(this.options, {
      lat: t.lat,
      lon: t.lng,
      zoom: Math.round(Math.log(n / 256) / Math.log(2)),
      addressdetails: 1,
      format: "json"
    }), o = await d(this.options.serviceUrl + "reverse", e), i = [];
    if (o && o.lat && o.lon) {
      const r = s.latLng(+o.lat, +o.lon), l = s.latLngBounds(r, r);
      i.push({
        name: o.display_name,
        html: this.options.htmlTemplate ? this.options.htmlTemplate(o) : void 0,
        center: r,
        bbox: l,
        properties: o
      });
    }
    return i;
  }
}
function Z(a) {
  return new f(a);
}
class K {
  constructor(t) {
    p(this, "options", {});
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    try {
      const n = this.options.OpenLocationCode.decode(t);
      return [{
        name: t,
        center: s.latLng(n.latitudeCenter, n.longitudeCenter),
        bbox: s.latLngBounds(
          s.latLng(n.latitudeLo, n.longitudeLo),
          s.latLng(n.latitudeHi, n.longitudeHi)
        )
      }];
    } catch (n) {
      return console.warn(n), [];
    }
  }
  async reverse(t, n) {
    try {
      return [{
        name: this.options.OpenLocationCode.encode(
          t.lat,
          t.lng,
          this.options.codeLength
        ),
        center: s.latLng(t.lat, t.lng),
        bbox: s.latLngBounds(
          s.latLng(t.lat, t.lng),
          s.latLng(t.lat, t.lng)
        )
      }];
    } catch (e) {
      return console.warn(e), [];
    }
  }
}
function tt(a) {
  return new K(a);
}
class S {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://api.opencagedata.com/geocode/v1/json"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const n = u(this.options, {
      key: this.options.apiKey,
      q: t
    }), e = await d(this.options.serviceUrl, n);
    return this._parseResults(e);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, n) {
    const e = h(this.options, {
      key: this.options.apiKey,
      q: [t.lat, t.lng].join(",")
    }), o = await d(this.options.serviceUrl, e);
    return this._parseResults(o);
  }
  _parseResults(t) {
    const n = [];
    if (t.results && t.results.length)
      for (let e = 0; e < t.results.length; e++) {
        const o = t.results[e], i = s.latLng(o.geometry);
        let r;
        o.annotations && o.annotations.bounds ? r = s.latLngBounds(
          s.latLng(o.annotations.bounds.northeast),
          s.latLng(o.annotations.bounds.southwest)
        ) : r = s.latLngBounds(i, i), n.push({
          name: o.formatted,
          bbox: r,
          center: i
        });
      }
    return n;
  }
}
function et(a) {
  return new S(a);
}
class m {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://api.geocode.earth/v1"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const n = u(this.options, {
      api_key: this.options.apiKey,
      text: t
    }), e = await d(this.options.serviceUrl + "/search", n);
    return this._parseResults(e, "bbox");
  }
  async suggest(t) {
    const n = u(this.options, {
      api_key: this.options.apiKey,
      text: t
    }), e = await d(this.options.serviceUrl + "/autocomplete", n);
    return this._parseResults(e, "bbox");
  }
  async reverse(t, n) {
    const e = h(this.options, {
      api_key: this.options.apiKey,
      "point.lat": t.lat,
      "point.lon": t.lng
    }), o = await d(this.options.serviceUrl + "/reverse", e);
    return this._parseResults(o, "bounds");
  }
  _parseResults(t, n) {
    const e = [];
    return s.geoJSON(t, {
      pointToLayer(o, i) {
        return s.circleMarker(i);
      },
      onEachFeature(o, i) {
        const r = {};
        let l, c;
        i.getBounds ? (l = i.getBounds(), c = l.getCenter()) : i.feature.bbox ? (c = i.getLatLng(), l = s.latLngBounds(
          s.GeoJSON.coordsToLatLng(i.feature.bbox.slice(0, 2)),
          s.GeoJSON.coordsToLatLng(i.feature.bbox.slice(2, 4))
        )) : (c = i.getLatLng(), l = s.latLngBounds(c, c)), r.name = i.feature.properties.label, r.center = c, r[n] = l, r.properties = i.feature.properties, e.push(r);
      }
    }), e;
  }
}
function v(a) {
  return new m(a);
}
const st = m, ot = v, nt = m, it = v;
class O extends m {
  constructor(t) {
    super(
      s.Util.extend(
        {
          serviceUrl: "https://api.openrouteservice.org/geocode"
        },
        t
      )
    );
  }
}
function rt(a) {
  return new O(a);
}
class P {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://photon.komoot.io/api/",
      reverseUrl: "https://photon.komoot.io/reverse/",
      nameProperties: ["name", "street", "suburb", "hamlet", "town", "city", "state", "country"]
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const n = u(this.options, { q: t }), e = await d(this.options.serviceUrl, n);
    return this._parseResults(e);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, n) {
    const e = h(this.options, {
      lat: t.lat,
      lon: t.lng
    }), o = await d(this.options.reverseUrl, e);
    return this._parseResults(o);
  }
  _parseResults(t) {
    var e;
    const n = [];
    if (t && t.features)
      for (let o = 0; o < t.features.length; o++) {
        const i = t.features[o], r = i.geometry.coordinates, l = s.latLng(r[1], r[0]), c = (e = i.properties) == null ? void 0 : e.extent, g = c ? s.latLngBounds([c[1], c[0]], [c[3], c[2]]) : s.latLngBounds(l, l);
        n.push({
          name: this._decodeFeatureName(i),
          html: this.options.htmlTemplate ? this.options.htmlTemplate(i) : void 0,
          center: l,
          bbox: g,
          properties: i.properties
        });
      }
    return n;
  }
  _decodeFeatureName(t) {
    return (this.options.nameProperties || []).map((n) => {
      var e;
      return (e = t.properties) == null ? void 0 : e[n];
    }).filter((n) => !!n).join(", ");
  }
}
function at(a) {
  return new P(a);
}
class T {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://api.what3words.com/v2/"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const n = await d(
      this.options.serviceUrl + "forward",
      u(this.options, {
        key: this.options.apiKey,
        //get three words and make a dot based string
        addr: t.split(/\s+/).join(".")
      })
    ), e = [];
    if (n.geometry) {
      const o = s.latLng(n.geometry.lat, n.geometry.lng), i = s.latLngBounds(o, o);
      e[0] = {
        name: n.words,
        bbox: i,
        center: o
      };
    }
    return e;
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, n) {
    const e = await d(
      this.options.serviceUrl + "reverse",
      h(this.options, {
        key: this.options.apiKey,
        coords: [t.lat, t.lng].join(",")
      })
    ), o = [];
    if (e.status.status == 200) {
      const i = s.latLng(e.geometry.lat, e.geometry.lng), r = s.latLngBounds(i, i);
      o[0] = {
        name: e.words,
        bbox: r,
        center: i
      };
    }
    return o;
  }
}
function lt(a) {
  return new T(a);
}
const ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArcGis: L,
  AzureMaps: x,
  Bing: y,
  GeocodeEarth: st,
  Google: w,
  HERE: U,
  HEREv2: C,
  LatLng: E,
  MapQuest: D,
  Mapbox: k,
  Mapzen: nt,
  Neutrino: B,
  Nominatim: f,
  OpenCage: S,
  OpenLocationCode: K,
  Openrouteservice: O,
  Pelias: m,
  Photon: P,
  What3Words: T,
  arcgis: q,
  azure: J,
  bing: H,
  geocodeEarth: ot,
  geocodingParams: u,
  google: V,
  here: $,
  latLng: F,
  mapQuest: X,
  mapbox: Q,
  mapzen: it,
  neutrino: Y,
  nominatim: Z,
  openLocationCode: tt,
  opencage: et,
  openrouteservice: rt,
  parseLatLng: R,
  pelias: v,
  photon: at,
  reverseParams: h,
  what3words: lt
}, Symbol.toStringTag, { value: "Module" }));
class _ {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(...t) {
  }
}
s.Util.extend(_.prototype, s.Control.prototype);
s.Util.extend(_.prototype, s.Evented.prototype);
class b extends _ {
  /**
   * Instantiates a geocoder control (to be invoked using `new`)
   * @param options the options
   */
  constructor(n) {
    super(n);
    p(this, "options", {
      showUniqueResult: !0,
      showResultIcons: !1,
      collapsed: !0,
      expand: "touch",
      position: "topright",
      placeholder: "Search...",
      errorMessage: "Nothing found.",
      iconLabel: "Initiate a new search",
      query: "",
      queryMinLength: 1,
      suggestMinLength: 3,
      suggestTimeout: 250,
      defaultMarkGeocode: !0
    });
    p(this, "_alts");
    p(this, "_container");
    p(this, "_errorElement");
    p(this, "_geocodeMarker");
    p(this, "_input");
    p(this, "_lastGeocode");
    p(this, "_map");
    p(this, "_preventBlurCollapse");
    p(this, "_requestCount", 0);
    p(this, "_results");
    p(this, "_selection");
    p(this, "_suggestTimeout");
    s.Util.setOptions(this, n), this.options.geocoder || (this.options.geocoder = new f());
  }
  addThrobberClass() {
    s.DomUtil.addClass(this._container, "leaflet-control-geocoder-throbber");
  }
  removeThrobberClass() {
    s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-throbber");
  }
  /**
   * Returns the container DOM element for the control and add listeners on relevant map events.
   * @param map the map instance
   * @see https://leafletjs.com/reference.html#control-onadd
   */
  onAdd(n) {
    var c;
    const e = "leaflet-control-geocoder", o = s.DomUtil.create("div", e + " leaflet-bar"), i = s.DomUtil.create("button", e + "-icon", o), r = s.DomUtil.create("div", e + "-form", o);
    this._map = n, this._container = o, i.innerHTML = "&nbsp;", i.type = "button", i.setAttribute("aria-label", this.options.iconLabel);
    const l = this._input = s.DomUtil.create("input", "", r);
    return l.type = "search", l.value = this.options.query, l.placeholder = this.options.placeholder, s.DomEvent.disableClickPropagation(l), this._errorElement = s.DomUtil.create(
      "div",
      e + "-form-no-error",
      o
    ), this._errorElement.innerHTML = this.options.errorMessage, this._alts = s.DomUtil.create(
      "ul",
      e + "-alternatives leaflet-control-geocoder-alternatives-minimized",
      o
    ), s.DomEvent.disableClickPropagation(this._alts), s.DomEvent.addListener(l, "keydown", this._keydown, this), (c = this.options.geocoder) != null && c.suggest && s.DomEvent.addListener(l, "input", this._change, this), s.DomEvent.addListener(l, "blur", () => {
      this.options.collapsed && !this._preventBlurCollapse && this._collapse(), this._preventBlurCollapse = !1;
    }), this.options.collapsed ? this.options.expand === "click" ? s.DomEvent.addListener(o, "click", (g) => {
      g.button === 0 && g.detail !== 2 && this._toggle();
    }) : this.options.expand === "touch" ? s.DomEvent.addListener(
      o,
      s.Browser.touch ? "touchstart mousedown" : "mousedown",
      (g) => {
        this._toggle(), g.preventDefault(), g.stopPropagation();
      },
      this
    ) : (s.DomEvent.addListener(o, "mouseover", this._expand, this), s.DomEvent.addListener(o, "mouseout", this._collapse, this), this._map.on("movestart", this._collapse, this)) : (this._expand(), s.Browser.touch ? s.DomEvent.addListener(o, "touchstart", () => this._geocode()) : s.DomEvent.addListener(o, "click", () => this._geocode())), this.options.defaultMarkGeocode && this.on("markgeocode", this.markGeocode, this), this.on("startgeocode", this.addThrobberClass, this), this.on("finishgeocode", this.removeThrobberClass, this), this.on("startsuggest", this.addThrobberClass, this), this.on("finishsuggest", this.removeThrobberClass, this), s.DomEvent.disableClickPropagation(o), o;
  }
  /**
   * Sets the query string on the text input
   * @param string the query string
   */
  setQuery(n) {
    return this._input.value = n, this;
  }
  _geocodeResult(n, e) {
    if (!e && this.options.showUniqueResult && n.length === 1)
      this._geocodeResultSelected(n[0]);
    else if (n.length > 0) {
      this._alts.innerHTML = "", this._results = n, s.DomUtil.removeClass(this._alts, "leaflet-control-geocoder-alternatives-minimized"), s.DomUtil.addClass(this._container, "leaflet-control-geocoder-options-open");
      for (let o = 0; o < n.length; o++)
        this._alts.appendChild(this._createAlt(n[o], o));
    } else
      s.DomUtil.addClass(this._container, "leaflet-control-geocoder-options-error"), s.DomUtil.addClass(this._errorElement, "leaflet-control-geocoder-error");
  }
  /**
   * Marks a geocoding result on the map
   * @param result the geocoding result
   */
  markGeocode(n) {
    const e = n.geocode;
    return this._map.fitBounds(e.bbox), this._geocodeMarker && this._map.removeLayer(this._geocodeMarker), this._geocodeMarker = new s.Marker(e.center).bindPopup(e.html || e.name).addTo(this._map).openPopup(), this;
  }
  async _geocode(n = !1) {
    const e = this._input.value;
    if (!n && e.length < this.options.queryMinLength)
      return;
    const o = ++this._requestCount;
    this._lastGeocode = e, n || this._clearResults();
    const i = { input: e };
    this.fire(n ? "startsuggest" : "startgeocode", i);
    const r = n ? await this.options.geocoder.suggest(e) : await this.options.geocoder.geocode(e);
    if (o === this._requestCount) {
      const l = { input: e, results: r };
      this.fire(n ? "finishsuggest" : "finishgeocode", l), this._geocodeResult(r, n);
    }
  }
  _geocodeResultSelected(n) {
    const e = { geocode: n };
    this.fire("markgeocode", e);
  }
  _toggle() {
    s.DomUtil.hasClass(this._container, "leaflet-control-geocoder-expanded") ? this._collapse() : this._expand();
  }
  _expand() {
    s.DomUtil.addClass(this._container, "leaflet-control-geocoder-expanded"), this._input.select(), this.fire("expand");
  }
  _collapse() {
    s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-expanded"), s.DomUtil.addClass(this._alts, "leaflet-control-geocoder-alternatives-minimized"), s.DomUtil.removeClass(this._errorElement, "leaflet-control-geocoder-error"), s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-open"), s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-error"), this._input.blur(), this.fire("collapse");
  }
  _clearResults() {
    s.DomUtil.addClass(this._alts, "leaflet-control-geocoder-alternatives-minimized"), this._selection = null, s.DomUtil.removeClass(this._errorElement, "leaflet-control-geocoder-error"), s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-open"), s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-error");
  }
  _createAlt(n, e) {
    const o = s.DomUtil.create("li", ""), i = s.DomUtil.create("a", "", o), r = this.options.showResultIcons && n.icon ? s.DomUtil.create("img", "", i) : null, l = n.html ? void 0 : document.createTextNode(n.name), c = (g) => {
      this._preventBlurCollapse = !0, s.DomEvent.stop(g), this._geocodeResultSelected(n), s.DomEvent.on(o, "click touchend", () => {
        this.options.collapsed ? this._collapse() : this._clearResults();
      });
    };
    return r && (r.src = n.icon), o.setAttribute("data-result-index", String(e)), n.html ? i.innerHTML = i.innerHTML + n.html : l && i.appendChild(l), s.DomEvent.addListener(o, "mousedown touchstart", c, this), o;
  }
  _keydown(n) {
    const e = (o) => {
      this._selection && (s.DomUtil.removeClass(this._selection, "leaflet-control-geocoder-selected"), this._selection = this._selection[o > 0 ? "nextSibling" : "previousSibling"]), this._selection || (this._selection = this._alts[o > 0 ? "firstChild" : "lastChild"]), this._selection && s.DomUtil.addClass(this._selection, "leaflet-control-geocoder-selected");
    };
    switch (n.keyCode) {
      // Escape
      case 27:
        this.options.collapsed ? this._collapse() : this._clearResults();
        break;
      // Up
      case 38:
        e(-1);
        break;
      // Up
      case 40:
        e(1);
        break;
      // Enter
      case 13:
        if (this._selection) {
          const o = parseInt(this._selection.getAttribute("data-result-index"), 10);
          this._geocodeResultSelected(this._results[o]), this._clearResults();
        } else
          this._geocode();
        break;
      default:
        return;
    }
    s.DomEvent.preventDefault(n);
  }
  _change() {
    const n = this._input.value;
    n !== this._lastGeocode && (clearTimeout(this._suggestTimeout), n.length >= this.options.suggestMinLength ? this._suggestTimeout = setTimeout(() => this._geocode(!0), this.options.suggestTimeout) : this._clearResults());
  }
}
function pt(a) {
  return new b(a);
}
/* @preserve
 * Leaflet Control Geocoder
 * https://github.com/perliedman/leaflet-control-geocoder
 *
 * Copyright (c) 2012 sa3m (https://github.com/sa3m)
 * Copyright (c) 2018 Per Liedman
 * All rights reserved.
 */
s.Util.extend(b, ct);
s.Util.extend(s.Control, {
  Geocoder: b,
  geocoder: pt
});
export {
  b as Geocoder,
  b as default,
  pt as geocoder,
  ct as geocoders
};
//# sourceMappingURL=Control.Geocoder.modern.js.map