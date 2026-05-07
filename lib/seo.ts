/*
  lib/seo.ts

  Single source of truth for site-wide SEO metadata.
  Anything indexed (title template, OG, Twitter, JSON-LD) reads from here.
  Page-level metadata can extend or override these defaults.
*/

const RAW_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amaravati.startup";

// Trim trailing slash so canonicals never double up.
const SITE_URL = RAW_URL.replace(/\/$/, "");

export const SITE = {
  name: "Amaravati Startup Capital",
  shortName: "Amaravati Startup Capital",
  url: SITE_URL,
  locale: "en_IN",
  /**
   * One-line product positioning. Shown in title fallbacks, meta description
   * defaults, and JSON-LD `description`.
   */
  tagline:
    "The founder-first operating system for the Amaravati startup district, Andhra Pradesh.",
  /**
   * Long-form description used by the marketing landing meta description.
   * Keep ≤ 160 chars for Google snippet truncation safety.
   */
  description:
    "Apply for Founder Residency, incorporate in 11 days, hire from Andhra Pradesh, and build inside the Amaravati startup district — backed by the AP government.",
  twitter: "@amaravatistartup",
  publisher: "AIM States",
  region: "Andhra Pradesh, India",
  /**
   * Default OG image (1200×630). Generated from the hero render by
   * `scripts/generate-seo-assets.mjs`.
   */
  ogImage: "/og-default.png",
  ogImageAlt:
    "Amaravati Startup Capital — golden-hour aerial render of the founder district",
  themeColor: "#FFFFFF",
  /**
   * Tag-style keywords. Modern SERPs ignore the keywords meta tag, but it's
   * still useful for internal LLM/RAG indexing and downstream tooling.
   */
  keywords: [
    "Amaravati",
    "Andhra Pradesh",
    "Startup Capital",
    "Founder Residency",
    "Startup Incorporation",
    "AP Skills Fund",
    "Founder Visa",
    "Startup District",
    "AIM States",
    "Quantum Valley",
    "India startup ecosystem",
  ],
} as const;

/** Helper: absolute URL for OG/canonical resolution outside metadataBase. */
export const absoluteUrl = (path = "/") =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
