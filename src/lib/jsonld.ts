import { CAFE } from "./cafe";
import { absoluteUrl, siteUrl } from "./site";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

/** Restaurant + website identity in the first HTML response. */
export function cafeJsonLd() {
  const origin = siteUrl();
  const phone = CAFE.phoneDisplay.replace(/[^\d+]/g, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": `${origin}/#cafe`,
        name: CAFE.name,
        url: origin,
        telephone: phone,
        email: CAFE.email,
        servesCuisine: ["Andhra", "Telugu"],
        hasMenu: absoluteUrl("/menu"),
        acceptsReservations: true,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Road no 7, Jubilee Hills, Bhavani Nagar",
          addressLocality: CAFE.city,
          postalCode: "500045",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: DAYS,
            opens: CAFE.hoursStart,
            closes: CAFE.hoursEnd,
          },
        ],
        sameAs: [CAFE.zomatoUrl, CAFE.swiggyUrl, CAFE.districtUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: CAFE.name,
        url: origin,
        publisher: { "@id": `${origin}/#cafe` },
      },
    ],
  };
}
