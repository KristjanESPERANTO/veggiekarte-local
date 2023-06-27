import { getReviews } from "mangrove-reviews";

// Of a particular subject.
const subReviews = await getReviews({ sub: "geo:51.4954589,11.9659188", q: "verwöner", u: 30, issuers: true, maresi_subjects: true });

console.log(subReviews.reviews);
