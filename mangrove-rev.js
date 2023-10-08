// Run this: node mangrove-rev.js

// "mangrove-reviews"
// import { getReviews } from "mangrove-reviews";
//
// const subReviews = await getReviews({ sub: "geo:51.4954589,11.9659188", q: "verwöner", u: 30, issuers: true, maresi_subjects: true });

// "mangrove-reviews-typescript"
import { MangroveReviews } from "mangrove-reviews-typescript";

const subReviews = await MangroveReviews.getReviews({ sub: "geo:51.4954589,11.9659188", q: "verwöner", u: 30, issuers: true, maresi_subjects: true });

console.log(subReviews.reviews);
