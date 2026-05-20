import { site } from "../data/site.mjs";

export function movingCompanySchema() {
  const s = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: site.brand,
    description: `${site.descriptor}. Family owned moving company serving ${site.serviceRegion} since ${site.foundedYear}.`,
    url: site.domain,
    telephone: site.phone,
    email: site.email,
    foundingDate: site.foundedYear,
    areaServed: site.serviceRegion,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street || undefined,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode || undefined,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHours: site.hours,
  };
  return s;
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
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.domain}${c.href}`,
    })),
  };
}
