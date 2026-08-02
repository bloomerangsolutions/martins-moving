import { site } from "../data/site.mjs";

export function movingCompanySchema(areaName) {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${site.domain}/#business`,
    name: site.brand,
    alternateName: site.descriptor,
    description: `${site.positioning}. Family owned moving company serving ${site.serviceRegion} since ${site.foundedYear}.`,
    url: site.domain,
    telephone: site.phone,
    foundingDate: site.foundedYear,
    priceRange: "$$",
    areaServed: areaName || site.serviceRegion,
    award: site.awards,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street || undefined,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode || undefined,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:30",
    },
  };
}

export function serviceSchema({ name, description, areaName }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: { "@type": "MovingCompany", name: site.brand, telephone: site.phone, url: site.domain },
    areaServed: areaName || site.serviceRegion,
    description,
  };
}

export function faqSchema(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${site.domain}${c.href}` })),
  };
}

// Real customer reviews recovered from the original site. No fabricated aggregate count.
export function reviewSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: { "@type": "MovingCompany", name: site.brand },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Mike M." },
      reviewBody: "Best mover we have ever had. The crew arrived on time, were efficient and very careful.",
    },
  ];
}

// AEO: tells answer engines which blocks are the concise, citable answer.
export function speakableSchema(canonicalPath) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${site.domain}${canonicalPath}`,
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer", ".faq-block"] },
  };
}

export function articleSchema(g) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title || g.label,
    description: g.metaDesc || g.summary || "",
    about: g.keyword || g.label,
    author: { "@type": "Organization", name: site.brand, url: site.domain },
    publisher: { "@type": "MovingCompany", name: site.brand, telephone: site.phone, url: site.domain },
    mainEntityOfPage: `${site.domain}/guides/${g.slug}`,
    inLanguage: "en-US",
  };
}
