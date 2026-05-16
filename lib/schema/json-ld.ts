// Bhurban, Murree — verified GPS coordinates (33.9603°N, 73.4538°E)
const GEO = { latitude: 33.9603, longitude: 73.4538 };

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
};

export function buildLodgingJsonLd(siteUrl: string): JsonLdGraph {
  const url = siteUrl.replace(/\/$/, "");
  const id = `${url}/#vacation-rental`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": `${url}/#lodging`,
        name: "Swiss Cottages Six",
        description:
          "Luxury private cottages near PC Bhurban, Murree Hills — exclusive gated estate at 6,800 ft with panoramic Kashmir peak views, 24/7 security, and direct booking.",
        url,
        telephone: "+92-319-0514569",
        priceRange: "PKR 28,000 – PKR 38,000 per night",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Off PC Bhurban Road",
          addressLocality: "Bhurban",
          addressRegion: "Punjab",
          postalCode: "47150",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        hasMap: "https://maps.app.goo.gl/xuDvuCaRxPECUBzB7",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 9.2,
          bestRating: 10,
          worstRating: 1,
          ratingCount: 86,
          reviewCount: 86,
        },
        makesOffer: {
          "@type": "Offer",
          itemOffered: { "@id": id },
          priceCurrency: "PKR",
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              name: "1–4 guests (includes breakfast for 4)",
              price: 28000,
              priceCurrency: "PKR",
              unitText: "NIGHT",
            },
            {
              "@type": "UnitPriceSpecification",
              name: "5–6 guests",
              price: 32000,
              priceCurrency: "PKR",
              unitText: "NIGHT",
            },
            {
              "@type": "UnitPriceSpecification",
              name: "7–8 guests (maximum capacity)",
              price: 38000,
              priceCurrency: "PKR",
              unitText: "NIGHT",
            },
          ],
        },
      },
      {
        "@type": "VacationRental",
        "@id": id,
        name: "Swiss Cottages Six — Luxury Cottage Bhurban, Murree Hills",
        url,
        description:
          "Private luxury cottage near PC Bhurban, Murree. 3 bedrooms, maximum 8 guests. Gated estate at 6,800 ft with panoramic Kashmir views, Interwood furnishings, WiFi, and 24/7 hot water.",
        containedInPlace: { "@id": `${url}/#lodging` },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        // Maximum occupancy: 8 guests
        occupancy: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 8,
          unitText: "guests",
        },
        numberOfRooms: 3,
        containsPlace: {
          "@type": "Accommodation",
          name: "Luxury Cottage Six · Bhurban",
          numberOfBedrooms: 3,
          numberOfBathroomsTotal: 2,
          floorSize: {
            "@type": "QuantitativeValue",
            value: 68,
            unitCode: "MTK",
          },
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "High-Speed Wi-Fi", value: true },
            { "@type": "LocationFeatureSpecification", name: "Mountain View", value: true },
            { "@type": "LocationFeatureSpecification", name: "Breakfast Included (up to 4 guests)", value: true },
            { "@type": "LocationFeatureSpecification", name: "Private Kitchen", value: true },
            { "@type": "LocationFeatureSpecification", name: "Gated 24/7 Security", value: true },
            { "@type": "LocationFeatureSpecification", name: "Private Parking", value: true },
            { "@type": "LocationFeatureSpecification", name: "24/7 Hot Water", value: true },
            { "@type": "LocationFeatureSpecification", name: "Climate Control", value: true },
            { "@type": "LocationFeatureSpecification", name: "Netflix", value: true },
            { "@type": "LocationFeatureSpecification", name: "Near PC Bhurban", value: true },
          ],
        },
      },
    ],
  };
}
