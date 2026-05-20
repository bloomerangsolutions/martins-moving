// Single source of truth for site-wide business facts.
// Items marked TODO must be confirmed by the client before the domain cuts over.
export const site = {
  brand: "Martin's Moving",
  legalName: "Martin's Moving",
  descriptor: "Bradenton & Sarasota Moving Co.",
  tagline: "Florida's trusted relocation experts",
  foundedYear: "2002", // TODO confirm: email says 2002, prior pages said 2004
  phone: "(941) 809-5777",
  phoneHref: "tel:9418095777",
  email: "martinsmoving2002@aol.com",
  domain: "https://martinsmovers.com",
  // NAP for LocalBusiness schema. TODO: confirm street address and hours.
  address: {
    street: "", // TODO confirm
    city: "Bradenton",
    region: "FL",
    regionName: "Florida",
    postalCode: "", // TODO confirm
    country: "US",
  },
  geo: { lat: "27.4989", lng: "-82.5748" }, // Bradenton approx; refine if address confirmed
  hours: "Mo-Sa 08:00-18:00", // TODO confirm
  // Mover licensing. Movers must display these. TODO: client to provide.
  licenses: {
    usdot: "{{USDOT_NUMBER}}",
    mc: "{{MC_NUMBER}}",
    flIm: "{{FL_IM_NUMBER}}",
  },
  socials: {
    facebook: "",
    google: "",
  },
  primaryCity: "Bradenton",
  serviceRegion: "Bradenton, Sarasota, and Manatee County",
};
