// City model for service pages split by home city.
// Bradenton is the home base (keeps the clean /services/<slug> URL).
// Sarasota gets /services/<slug>-sarasota.
export const cities = {
  bradenton: {
    key: "bradenton",
    name: "Bradenton",
    county: "Manatee County",
    suffix: "",
    base: true,
    geo: { lat: 27.4989, lng: -82.5748 },
    neighborhoods: ["bradenton", "palmetto", "parrish", "lakewood-ranch", "university-park", "mill-creek", "panther-ridge", "esplanade", "mallory-park", "myakka"],
  },
  sarasota: {
    key: "sarasota",
    name: "Sarasota",
    county: "Sarasota County",
    suffix: "-sarasota",
    base: false,
    geo: { lat: 27.3364, lng: -82.5307 },
    neighborhoods: ["sarasota", "siesta-key", "lido-key", "st-armands", "bird-key", "gulf-gate-estates", "palmer-ranch", "bee-ridge", "fruitville", "sarasota-springs", "rosemary-district", "osprey", "nokomis", "venice", "south-sarasota", "north-sarasota", "vamo", "longboat-key", "englewood"],
  },
};

export const otherCity = (key) => (key === "bradenton" ? cities.sarasota : cities.bradenton);
