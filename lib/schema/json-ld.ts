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
        priceRange: "PKR 28,000 – PKR 40,000 per night",
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
          ratingCount: 384,
          reviewCount: 384,
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
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How far is Swiss Cottages Six from PC Bhurban?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Swiss Cottages Six is approximately 2 minutes' drive from Pearl Continental Bhurban, located off PC Bhurban Road in Bhurban, Murree Hills at an elevation of 6,800 ft.",
            },
          },
          {
            "@type": "Question",
            name: "How many guests can stay at Swiss Cottages Six?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The cottage accommodates up to 8 guests across 3 bedrooms and 2 bathrooms. It is ideal for families and private group retreats.",
            },
          },
          {
            "@type": "Question",
            name: "What is the nightly rate for Swiss Cottages Six?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Direct booking rates start from PKR 28,000 per night for 1–4 guests, PKR 32,000 for 5–6 guests, and PKR 38,000 for 7–8 guests. The list price is PKR 40,000/night — booking directly saves up to 30%.",
            },
          },
          {
            "@type": "Question",
            name: "Is an advance booking fee required?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A 10% non-refundable advance reservation fee is required to secure your dates. The remaining balance is payable at check-in.",
            },
          },
          {
            "@type": "Question",
            name: "What amenities are included?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The cottage includes high-speed WiFi, Netflix, 24/7 hot water, climate control, private parking for 2 vehicles, breakfast for up to 4 guests, Interwood furnished interiors, 24/7 gated security, and panoramic views of the Pir Panjal range.",
            },
          },
          {
            "@type": "Question",
            name: "Can I book directly without using Airbnb or Booking.com?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Direct bookings are encouraged — you avoid all platform fees and receive the best available rate. Contact us via WhatsApp at +92 319 0514569 or use the booking calendar on our website.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: url },
          { "@type": "ListItem", position: 2, name: "Cottages", item: `${url}/#cottages` },
          { "@type": "ListItem", position: 3, name: "Book", item: `${url}/#booking` },
        ],
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
