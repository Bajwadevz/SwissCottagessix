const DEFAULT_COORDS = {
  latitude: 33.9603,
  longitude: 73.4538,
};

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
        url,
        telephone: "+92-51-000-0000",
        priceRange: "$$$",
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
          latitude: DEFAULT_COORDS.latitude,
          longitude: DEFAULT_COORDS.longitude,
        },
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
        },
      },
      {
        "@type": "VacationRental",
        "@id": id,
        name: "Swiss Cottages Six — Luxury cottage, Bhurban",
        url,
        description:
          "Exclusive gated community of twelve luxury cottages in Bhurban, Murree — panoramic Kashmir peak views, 24/7 security, direct booking.",
        containedInPlace: { "@id": `${url}/#lodging` },
        occupancy: {
          "@type": "QuantitativeValue",
          value: 3,
          unitText: "bedrooms",
        },
        numberOfRooms: 3,
        containsPlace: {
          "@type": "Accommodation",
          name: "Primary suite configuration",
          numberOfBedrooms: 3,
          numberOfBathroomsTotal: 3,
          floorSize: {
            "@type": "QuantitativeValue",
            value: 68,
            unitCode: "MTK",
          },
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "High-Speed Wi-Fi", value: true },
            { "@type": "LocationFeatureSpecification", name: "Mountain View", value: true },
            { "@type": "LocationFeatureSpecification", name: "Private Kitchen", value: true },
            { "@type": "LocationFeatureSpecification", name: "Gated Security", value: true },
            { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
          ],
        },
      },
    ],
  };
}
