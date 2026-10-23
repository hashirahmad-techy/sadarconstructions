import { site } from "@/data/site";

export const SITE_URL = "https://sadarconstructions.in";

type SeoInput = {
  title: string;
  description: string;
  path?: string; // e.g. "/services"
  image?: string; // path inside /public or a full URL
};

export function seo({ title, description, path = "/", image = "/og-image.jpg" }: SeoInput) {
  const url = `${SITE_URL}${path}`;
  const img = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    // Canonical goes on each page, never in the root, so it never repeats
    links: [{ rel: "canonical", href: url }],
  };
}

// ── Business details for Google. Fill in real values; empty ones are skipped. ──
const BUSINESS = {
  phone: "", // e.g. "+91 98765 43210"
  email: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  areaServed: [] as string[], // e.g. ["Bhopal", "Indore"]
  sameAs: [] as string[], // Facebook, Google Business Profile, LinkedIn links
};

export function businessSchema() {
  const hasAddress = Boolean(BUSINESS.city && BUSINESS.state);
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    description: site.metaDescription,
    ...(BUSINESS.phone && { telephone: BUSINESS.phone }),
    ...(BUSINESS.email && { email: BUSINESS.email }),
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.streetAddress,
        addressLocality: BUSINESS.city,
        addressRegion: BUSINESS.state,
        postalCode: BUSINESS.postalCode,
        addressCountry: "IN",
      },
    }),
    ...(BUSINESS.areaServed.length && {
      areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "City", name })),
    }),
    sameAs: [site.instagram, ...BUSINESS.sameAs].filter(Boolean),
  };
}
