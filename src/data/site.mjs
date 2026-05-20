// Single source of truth for site-wide business facts.
// Values recovered from the original approved site; placeholders marked TODO.
export const site = {
  brand: "Martin's Moving",
  legalName: "Martin's Moving",
  descriptor: "Bradenton & Sarasota Moving Co.",
  positioning: "Precision Relocation Experts",
  tagline: "Florida's trusted moving company",
  foundedYear: "2004",
  yearsInBusiness: "20+",
  phone: "(941) 809-5777",
  phoneHref: "tel:9418095777",
  email: "martinsmoving2002@aol.com",
  domain: "https://martinsmovers.com",
  address: {
    street: "", // TODO confirm street address for full LocalBusiness schema
    city: "Bradenton",
    region: "FL",
    regionName: "Florida",
    postalCode: "", // TODO confirm
    country: "US",
  },
  geo: { lat: "27.4989", lng: "-82.5748" }, // Bradenton; refine when street address confirmed
  hoursDisplay: "Mon-Fri: 8:30am - 5:30pm",
  hoursSchema: "Mo-Fr 08:30-17:30",
  emergency: "24/7 Emergency Service",
  awards: ["Bradenton's Best 2021", "Bradenton's Best 2022", "Best of SRQ 2025"],
  // Licensing. FL intrastate mover registration recovered from original site.
  licenses: {
    flIm: "IM595",
    usdot: "{{USDOT_NUMBER}}", // TODO: needed for interstate moves
    mc: "{{MC_NUMBER}}",       // TODO: if applicable
  },
  // Lead form delivery. Paste a free Web3Forms access key (web3forms.com) to activate
  // delivery on every form. Until set, forms validate and show an "almost ready" state.
  web3formsKey: "{{WEB3FORMS_ACCESS_KEY}}",
  serviceRegion: "Bradenton, Sarasota, and Manatee County",
  primaryCity: "Bradenton",
};
