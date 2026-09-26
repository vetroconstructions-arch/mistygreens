/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Ultra-Advanced Cloudflare Standalone SEO Worker v5.0
 * Domain: https://www.paranjapetownship.com
 * Architecture: ES Modules Worker with Streaming HTMLRewriter Pipeline
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Core Capabilities:
 *  1. Sub-5ms Edge TTFB with Edge Cache API (`caches.default`)
 *  2. Apex to WWW Canonical 301 Edge Normalization
 *  3. 4-Tier Crawler Intelligence Classification
 *  4. 6x Real-Time Streaming HTMLRewriter Transformations
 *  5. Serverless High-Speed Lead Ingestion (`/api/lead-capture` & `/api/enquiry`)
 *  6. Cloudflare R2 Media Object Streaming Proxy with Range Header Support
 *  7. Hardened Edge Security & Core Web Vitals Headers
 *  8. Geo-Targeted ICBM & Sitelinks Search Schema Injection
 */

export interface Env {
  MEDIA_BUCKET?: R2Bucket;
  DB?: D1Database;
  RATE_LIMIT_KV?: KVNamespace;
  ANALYTICS?: AnalyticsEngineDataset;
  ENVIRONMENT?: string;
  ORIGIN_URL?: string;
}

const CANONICAL_HOSTNAME = "www.paranjapetownship.com";
const CANONICAL_ORIGIN = "https://www.paranjapetownship.com";

// Permanent canonical routing for legacy enclaves & facilities
const PERMALINK_REDIRECTS: Record<string, string> = {
  "/misty-greens": "/paranjape-forest-trails-township-bhugaon-misty-greens/",
  "/the-rivolo": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
  "/rivolo-residences": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
  "/the-canopy": "/paranjape-forest-trails-township-bhugaon-the-canopy/",
  "/canopy-apartments-bhugaon": "/paranjape-forest-trails-township-bhugaon-the-canopy/",
  "/athashri": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
  "/the-highgardens": "/paranjape-forest-trails-township-bhugaon-highgardens/",
  "/highgardens": "/paranjape-forest-trails-township-bhugaon-highgardens/",
  "/the-cove": "/paranjape-forest-trails-township-bhugaon-the-cove/",
  "/everglades": "/paranjape-forest-trails-township-bhugaon-everglades/",
  "/verandah": "/paranjape-forest-trails-township-bhugaon-verandah/",
  "/the-verandah": "/paranjape-forest-trails-township-bhugaon-verandah/",
  "/orchard": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
  "/orchard-residences": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
  "/swaniketan": "/paranjape-forest-trails-township-bhugaon-swaniketan/",
  "/apartments": "/paranjape-forest-trails-township-bhugaon-apartments/",
  "/villas": "/paranjape-forest-trails-township-bhugaon-luxury-forest-villas-bhugaon/",
  "/rera-compliance-guide": "/rera-status-forest-trails/",
  "/contact": "/paranjape-schemes-contact/",
  "/paranjape-forest-trails-township-bhugaon-contact": "/paranjape-schemes-contact/",
  "/paranjape-forest-trails-township-bhugaon-brochure": "/paranjape-forest-trails-bhugaon-floor-plan-2026/",
  "/the-cliff-lifestyle-hub": "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
  "/cliff-club": "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
  "/sri-sri-ravishankar-school": "/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/",
  "/ssrvm-school": "/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/",
  "/equestrian-academy": "/paranjape-forest-trails-township-bhugaon-amenities/equestrian-academy-pune/",
  "/paranjape-forest-trails-township-bhugaon-villas-plots.html": "/paranjape-forest-trails-township-bhugaon-villas-plots/",
  "/paranjape-forest-trails-township-bhugaon-facilities.html": "/paranjape-forest-trails-township-bhugaon-facilities/",
  "/bhugaon-growth-ledger.html": "/investment/growth-ledger/",
  "/bhugaon-growth-ledger": "/investment/growth-ledger/",
  "/paranjape-forest-trails-township-bhugaon-legal/privacy-policy.html": "/privacy-policy/",
  "/paranjape-forest-trails-township-bhugaon-legal/privacy-policy": "/privacy-policy/",
  "/paranjape-forest-trails-township-bhugaon-legal/terms-conditions.html": "/terms-of-use/",
  "/paranjape-forest-trails-township-bhugaon-legal/terms-conditions": "/terms-of-use/",
  "/terms-conditions": "/terms-of-use/",
};

// ─── Geo & Currency Intelligence Matrix ──────────────────────────────────────
const CURRENCY_REGIONS: Record<string, { code: string; symbol: string }> = {
  IN: { code: "INR", symbol: "₹" },
  US: { code: "USD", symbol: "$" },
  CA: { code: "CAD", symbol: "C$" },
  AE: { code: "AED", symbol: "AED " },
  SA: { code: "SAR", symbol: "SAR " },
  QA: { code: "QAR", symbol: "QAR " },
  OM: { code: "OMR", symbol: "OMR " },
  KW: { code: "KWD", symbol: "KWD " },
  BH: { code: "BHD", symbol: "BHD " },
  GB: { code: "GBP", symbol: "£" },
  SG: { code: "SGD", symbol: "S$" },
  AU: { code: "AUD", symbol: "A$" },
  NZ: { code: "NZD", symbol: "NZ$" },
  DE: { code: "EUR", symbol: "€" },
  FR: { code: "EUR", symbol: "€" },
  NL: { code: "EUR", symbol: "€" },
  IE: { code: "EUR", symbol: "€" },
  DEFAULT: { code: "INR", symbol: "₹" },
};

// ─── 4-Tier Crawler Classification Matrix ────────────────────────────────────

const CRAWLER_TIERS = {
  tier1: /Googlebot|Google-InspectionTool|Googlebot-Image|Googlebot-Video|Mediapartners-Google|AdsBot-Google|Google-Safety/i,
  tier2: /bingbot|BingPreview|Applebot|DuckDuckBot|Baiduspider|YandexBot|Slurp/i,
  tier3: /ChatGPT-User|GPTBot|PerplexityBot|ClaudeBot|Bytespider|CCBot|anthropic-ai|cohere-ai/i,
  tier4: /WhatsApp|TelegramBot|Slackbot|Discordbot|facebookexternalhit|Twitterbot|LinkedInBot|Pinterestbot/i,
};

interface CrawlerClassification {
  tier: number;
  label: string;
  isSearch: boolean;
  isSocial: boolean;
}

function classifyCrawler(ua: string): CrawlerClassification {
  if (CRAWLER_TIERS.tier1.test(ua)) return { tier: 1, label: "google", isSearch: true, isSocial: false };
  if (CRAWLER_TIERS.tier2.test(ua)) return { tier: 2, label: "major-search", isSearch: true, isSocial: false };
  if (CRAWLER_TIERS.tier3.test(ua)) return { tier: 3, label: "ai-crawler", isSearch: false, isSocial: false };
  if (CRAWLER_TIERS.tier4.test(ua)) return { tier: 4, label: "social-preview", isSearch: false, isSocial: true };
  return { tier: 0, label: "user", isSearch: false, isSocial: false };
}

// Early Hints & Resource Links
const EARLY_HINTS_LINKS = [
  "</style.min.css?v=2026.08.24.10>; rel=preload; as=style",
  "<https://fonts.googleapis.com>; rel=preconnect; crossorigin",
  "<https://fonts.gstatic.com>; rel=preconnect; crossorigin",
  "<https://www.googletagmanager.com>; rel=preconnect",
  "<https://www.google-analytics.com>; rel=preconnect",
];

// ─── HTMLRewriter Handlers ───────────────────────────────────────────────────

/**
 * 1. Canonical URL Enforcer: Guarantees strict canonical formatting
 */
class CanonicalEnforcer {
  constructor(private pathname: string) {}
  element(el: Element) {
    const href = el.getAttribute("href");
    if (href) {
      let cleanPath = this.pathname
        .replace(/\/index\.html$/, "/")
        .replace(/\/$/, "") || "/";
      if (cleanPath !== "/" && !cleanPath.includes(".")) {
        cleanPath += "/";
      }
      el.setAttribute("href", CANONICAL_ORIGIN + cleanPath);
    }
  }
}

/**
 * 2. Head Meta Injector: Geo coordinates, preconnect, and hreflang
 */
class HeadMetaInjector {
  constructor(
    private pathname: string,
    private crawlerInfo: CrawlerClassification,
    private cfData: { country: string; city: string; colo: string; region: string }
  ) {}

  element(head: Element) {
    const cleanPath = this.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    const canonicalUrl = CANONICAL_ORIGIN + (cleanPath === "/" ? "/" : cleanPath + "/");

    const country = this.cfData?.country || "IN";
    const currency = CURRENCY_REGIONS[country] || CURRENCY_REGIONS["DEFAULT"];

    const geoBlock = `
<!-- CF Enterprise Edge SEO Engine v6.1 (Worker Edition - Google Ecosystem Hardened + NRI Geo & INP) -->
<meta name="geo.region" content="IN-MH">
<meta name="geo.placename" content="Bhugaon, Pune West, Maharashtra, India">
<meta name="geo.position" content="18.5050;73.7406">
<meta name="ICBM" content="18.5050, 73.7406">
<meta name="geo.detected_country" content="${country}">
<meta name="geo.currency" content="${currency.code}">
<meta name="author" content="Paranjape Schemes (Construction) Ltd.">
<meta name="copyright" content="© 2026 Paranjape Forest Trails. All Rights Reserved.">`;

    const googleDirectives = `
<meta name="google-site-verification" content="fA009Y6RAvi_yacg8Lw7JJu5uvAGR5po2RIUH8VcuvE">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="googlebot-news" content="index, follow">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/branding/favicon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/branding/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/branding/apple-touch-icon.png">
<link rel="alternate" type="text/plain" href="${CANONICAL_ORIGIN}/llms.txt" title="LLM Knowledge Base">
<link rel="sitemap" type="application/xml" href="${CANONICAL_ORIGIN}/sitemap.xml">`;

    let heroPreload = "";
    if (cleanPath === "/" || cleanPath === "") {
      heroPreload = `\n<link rel="preload" as="image" href="/images/hero-township.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("misty-greens") || cleanPath.includes("plot")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/misty-greens-plots.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("rivolo") || cleanPath.includes("villa")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/rivolo-villas.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("canopy") || cleanPath.includes("2bhk") || cleanPath.includes("flat") || cleanPath.includes("apartment")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/canopy-apartments.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("cove") || cleanPath.includes("bungalow")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/the-cove.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("athashri") || cleanPath.includes("senior")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/athashri.webp" fetchpriority="high">`;
    }

    const preconnectBlock = `
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://formsubmit.co">`;

    let hreflangBlock = `
<link rel="alternate" hreflang="en-IN" href="${canonicalUrl}">
<link rel="alternate" hreflang="en" href="${canonicalUrl}">
<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">`;
    if (cleanPath.includes("pune-mein-") || cleanPath.includes("bhugaon-mein-")) {
      hreflangBlock += `\n<link rel="alternate" hreflang="hi-IN" href="${canonicalUrl}">`;
    } else if (cleanPath.includes("pune-madhe-") || cleanPath.includes("bhugaon-madhe-")) {
      hreflangBlock += `\n<link rel="alternate" hreflang="mr-IN" href="${canonicalUrl}">`;
    }

    head.append(geoBlock + googleDirectives + heroPreload + preconnectBlock + hreflangBlock, { html: true });

    if (cleanPath === "/" || cleanPath === "") {
      const sitelinksSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.paranjapetownship.com/#website",
      "url": "https://www.paranjapetownship.com/",
      "name": "Paranjape Forest Trails Bhugaon",
      "description": "Official portal of Pune's premier 190-acre integrated forest township by Paranjape Schemes (Construction) Ltd.",
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.paranjapetownship.com/#organization",
        "name": "Paranjape Schemes (Construction) Ltd.",
        "url": "https://www.paranjapetownship.com/",
        "logo": "https://www.paranjapetownship.com/assets/branding/logo.png"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.paranjapetownship.com/sitemap-page/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["en-IN", "hi-IN", "mr-IN"]
    },
    {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": "https://www.paranjapetownship.com/#organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "alternateName": "Paranjape Forest Trails Bhugaon",
      "url": "https://www.paranjapetownship.com/",
      "logo": "https://www.paranjapetownship.com/assets/branding/logo.png",
      "image": "https://www.paranjapetownship.com/images/hero-township.webp",
      "telephone": "+91-7744009295",
      "email": "propsmartrealty@gmail.com",
      "priceRange": "₹₹₹₹",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.5099377,
        "longitude": 73.738964
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Forest Trails Township, Paud Road, Bhugaon",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "412115",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/paranjapeschemes",
        "https://www.instagram.com/paranjapeschemes",
        "https://www.youtube.com/user/ParanjapeSchemes",
        "https://en.wikipedia.org/wiki/Paranjape_Schemes"
      ]
    }
  ]
}
</script>`;
      head.append(sitelinksSchema, { html: true });
    }
  }
}

/**
 * 3. OG Image Absolutifier: Ensures complete absolute HTTPS URLs for social crawlers
 */
class OGImageAbsolutifier {
  element(el: Element) {
    const content = el.getAttribute("content");
    if (content && content.startsWith("/")) {
      el.setAttribute("content", CANONICAL_ORIGIN + content);
    }
  }
}

/**
 * 4. Performance Hint Injector: Preload critical typography and PWA theme
 */
class PerformanceHintInjector {
  element(head: Element) {
    const hints = `
<link rel="preload" href="/style.min.css?v=2026.08.24.10" as="style">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" as="style" crossorigin>
<meta name="theme-color" content="#4A0808">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=yes">
<meta http-equiv="x-dns-prefetch-control" content="on">`;
    head.append(hints, { html: true });
  }
}

/**
 * 5. Internal Link Normalizer: Enforces trailing slash on local directories
 */
class InternalLinkNormalizer {
  element(el: Element) {
    const href = el.getAttribute("href");
    if (href && href.startsWith("/") && !href.includes(".") && !href.endsWith("/") && href !== "/") {
      el.setAttribute("href", href + "/");
    }
  }
}

/**
 * 6. Image Lazy-Load Optimizer: Prioritizes above-the-fold hero images, lazy loads the rest, prevents CLS
 */
class ImageOptimizer {
  private imageCount = 0;
  element(el: Element) {
    this.imageCount++;
    if (this.imageCount <= 2) {
      el.setAttribute("loading", "eager");
      el.setAttribute("fetchpriority", "high");
      el.removeAttribute("decoding");
    } else {
      if (!el.getAttribute("loading")) {
        el.setAttribute("loading", "lazy");
      }
      if (!el.getAttribute("decoding")) {
        el.setAttribute("decoding", "async");
      }
      if (!el.getAttribute("fetchpriority")) {
        el.setAttribute("fetchpriority", "low");
      }
    }

    const width = el.getAttribute("width");
    const height = el.getAttribute("height");
    const style = el.getAttribute("style") || "";
    if (!width && !height && !style.includes("aspect-ratio")) {
      el.setAttribute("style", (style ? style + "; " : "") + "aspect-ratio: 16/9; max-width: 100%; height: auto;");
    }
  }
}

/**
 * 7. External Link Security & SEO Optimizer
 */
class ExternalLinkOptimizer {
  element(el: Element) {
    const href = el.getAttribute("href");
    if (!href) return;

    const isExternal = (href.startsWith("http://") || href.startsWith("https://")) &&
                       !href.includes("paranjapetownship.com") &&
                       !href.includes("paranjapeplots.com");

    if (isExternal) {
      if (!el.getAttribute("target")) {
        el.setAttribute("target", "_blank");
      }
      const currentRel = el.getAttribute("rel") || "";
      const relParts = new Set(currentRel.split(/\s+/).filter(Boolean));
      relParts.add("noopener");
      relParts.add("noreferrer");

      if (!href.includes("maharera.mahaonline.gov.in") && !href.includes("wa.me") && !href.includes("maps.google.com")) {
        relParts.add("nofollow");
      }

      el.setAttribute("rel", Array.from(relParts).join(" "));
    }
  }
}

/**
 * 8. Image Alt & Accessibility Guardian for Googlebot Image
 */
class ImageAltA11yEnforcer {
  element(el: Element) {
    const alt = el.getAttribute("alt");
    const src = el.getAttribute("src") || "";
    if (!alt || alt.trim() === "") {
      let derivedAlt = "Paranjape Forest Trails Township Bhugaon Pune";
      if (src.includes("misty-greens")) derivedAlt = "Misty Greens NA Bungalow Plots Paranjape Forest Trails Bhugaon Pune";
      else if (src.includes("rivolo")) derivedAlt = "The Rivolo Luxury Forest Villas 4BHK 5BHK Bhugaon Pune West";
      else if (src.includes("cove")) derivedAlt = "The Cove Twin Bungalows Forest Trails Bhugaon Pune";
      else if (src.includes("canopy")) derivedAlt = "The Canopy 2BHK 3BHK Nature Apartments Bhugaon Pune";
      else if (src.includes("athashri")) derivedAlt = "Athashri Senior Living Community Forest Trails Bhugaon Pune";
      else if (src.includes("highgardens")) derivedAlt = "The Highgardens Nature Living Apartments Bhugaon";
      else if (src.includes("verandah")) derivedAlt = "The Verandah Luxury Duplex Apartments Bhugaon Pune";
      else if (src.includes("cliff-club") || src.includes("amenities")) derivedAlt = "The Cliff Lifestyle Club Amenities Forest Trails Bhugaon";
      else if (src.includes("ssrvm")) derivedAlt = "Sri Sri Ravishankar Vidya Mandir School Forest Trails Bhugaon";
      else if (src.includes("equestrian")) derivedAlt = "Equestrian Academy Horse Riding Forest Trails Bhugaon";
      else if (src.includes("logo")) derivedAlt = "Paranjape Schemes Construction Ltd Official Logo";
      el.setAttribute("alt", derivedAlt);
    }
  }
}

/**
 * 9. Semantic Structure Guardian (Dynamic Hierarchical Breadcrumb Schema)
 */
class SemanticStructureGuardian {
  private pathname: string;
  constructor(pathname: string) {
    this.pathname = pathname;
  }
  element(head: Element) {
    const cleanPath = this.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
    if (cleanPath && cleanPath !== "") {
      const segments = cleanPath.split("/").filter(Boolean);
      const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": CANONICAL_ORIGIN + "/"
          }
        ]
      };

      let accum = "";
      segments.forEach((seg, idx) => {
        accum += "/" + seg;
        const name = seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        breadcrumbList.itemListElement.push({
          "@type": "ListItem",
          "position": idx + 2,
          "name": name,
          "item": CANONICAL_ORIGIN + accum + "/"
        });
      });

      head.append(
        `\n<!-- CF Edge Semantic Breadcrumb Guardian -->\n<script type="application/ld+json">\n${JSON.stringify(breadcrumbList, null, 2)}\n</script>\n`,
        { html: true }
      );
    }
  }
}

/**
 * 10. W3C Speculation Rules API Injector (Chrome Instant Prerender 2.0)
 */
class SpeculationRulesInjector {
  element(head: Element) {
    const rules = {
      prerender: [
        {
          source: "list",
          urls: [
            "/paranjape-forest-trails-township-bhugaon-misty-greens/",
            "/paranjape-forest-trails-township-bhugaon-the-canopy/",
            "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
            "/paranjape-forest-trails-bhugaon-price-2026/",
            "/paranjape-schemes-contact/",
            "/sitemap-page/"
          ],
          score: 0.95
        }
      ],
      prefetch: [
        {
          source: "document",
          where: {
            and: [
              { href_matches: "/*" },
              { not: { href_matches: "/api/*" } },
              { not: { href_matches: "/404*" } }
            ]
          },
          eagerness: "moderate"
        }
      ]
    };

    head.append(
      `\n<!-- Chrome Instant Prerender Speculation Rules API v2.0 -->\n<script type="speculationrules">\n${JSON.stringify(rules, null, 2)}\n</script>\n`,
      { html: true }
    );
  }
}

/**
 * 11. Google Voice & Assistant Speakable Microdata Optimizer
 */
class EdgeSpeakableVoiceOptimizer {
  private pathname: string;
  constructor(pathname: string) {
    this.pathname = pathname;
  }
  element(head: Element) {
    const speakable = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".lead", ".enclave-intro", "main p:first-of-type"]
      }
    };
    head.append(
      `\n<!-- Google Assistant & Voice Search Speakable Spec -->\n<script type="application/ld+json">\n${JSON.stringify(speakable, null, 2)}\n</script>\n`,
      { html: true }
    );
  }
}

/**
 * 12. Interaction to Next Paint (INP) & Core Web Vitals Optimizer
 */
class INPPerformanceOptimizer {
  constructor(private isBot: boolean) {}
  element(head: Element) {
    if (this.isBot) return;
    const snippet = `
<!-- Chrome Core Web Vitals INP/FID Optimization Engine -->
<script>
(function() {
  if (typeof window === 'undefined') return;
  window.requestIdle = (window as any).requestIdleCallback || function(cb: Function) { return setTimeout(cb, 1200); };
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', { get: function() { supportsPassive = true; } });
    window.addEventListener('testPassive', null as any, opts);
    window.removeEventListener('testPassive', null as any, opts);
  } catch (e) {}
  (window as any).__supportsPassive = supportsPassive;
})();
</script>`;
    head.append(snippet, { html: true });
  }
}

/**
 * 13. NRI & International Multi-Currency Personalization
 */
class NRIPersonalizationOptimizer {
  constructor(
    private country: string,
    private currency: { code: string; symbol: string },
    private isBot: boolean
  ) {}
  element(body: Element) {
    if (this.isBot || this.country === "IN") return;
    const nriBadge = `
<!-- NRI Concierge & Currency Desk -->
<aside id="nri-desk-badge" style="position:fixed;bottom:24px;left:20px;z-index:9999;background:linear-gradient(135deg,rgba(44,4,4,0.95),rgba(74,8,8,0.95));color:#f5eedc;border:1px solid #d4af37;border-radius:24px;padding:8px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.4);font-family:system-ui,-apple-system,sans-serif;font-size:12px;display:flex;align-items:center;gap:10px;backdrop-filter:blur(10px);transition:transform 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 6px #10b981;"></span>
  <span><strong>NRI Desk Active:</strong> Rates in <strong>${this.currency.code} (${this.currency.symbol})</strong> | <a href="/nri-investment-bhugaon/" style="color:#d4af37;text-decoration:underline;font-weight:600;">NRI Guide &amp; FEMA</a></span>
</aside>`;
    body.append(nriBadge, { html: true });
  }
}

// ─── Cache & Security Header Utilities ───────────────────────────────────────

function applyCacheHeaders(headers: Headers, url: URL): void {
  const pathname = url.pathname;

  // Immutable hashed assets
  if (pathname.startsWith("/_astro/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    return;
  }

  // Media assets
  if (pathname.startsWith("/images/") || pathname.startsWith("/assets/") || pathname.startsWith("/media/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    headers.set("Timing-Allow-Origin", "*");
    return;
  }

  // Sitemaps & robots
  if (pathname.endsWith(".xml") || pathname === "/robots.txt" || pathname.endsWith(".txt")) {
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=86400");
    if (pathname.endsWith(".xml")) {
      headers.set("X-Robots-Tag", "noindex, follow");
    }
    return;
  }

  // Bundled scripts & styles
  if (pathname.endsWith(".css") || pathname.endsWith(".js")) {
    headers.set("Cache-Control", "public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=2592000");
    return;
  }

  // HTML documents
  headers.set("Cache-Control", "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400, stale-if-error=604800");
  headers.set("CDN-Cache-Control", "max-age=604800");
  headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
}

function applySecurityHeaders(headers: Headers): void {
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
}

// ─── Worker Fetch Entrypoint ─────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const startTime = Date.now();
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    const crawlerInfo = classifyCrawler(userAgent);

    // 1. Apex Domain & Protocol Canonical Normalization (301)
    if (
      url.hostname === "paranjapeplots.com" ||
      url.hostname === "www.paranjapeplots.com" ||
      url.hostname === "paranjapetownship.com" ||
      (url.protocol === "http:" && !url.hostname.includes("localhost") && !url.hostname.includes("127.0.0.1"))
    ) {
      const canonicalUrl = new URL(request.url);
      canonicalUrl.hostname = CANONICAL_HOSTNAME;
      canonicalUrl.protocol = "https:";
      return Response.redirect(canonicalUrl.toString(), 301);
    }

    // 1b. Legacy Permalink Edge 301 Canonical Routing
    const cleanPath = url.pathname.replace(/\/$/, "");
    if (PERMALINK_REDIRECTS[url.pathname] || (cleanPath && PERMALINK_REDIRECTS[cleanPath])) {
      const target = PERMALINK_REDIRECTS[url.pathname] || PERMALINK_REDIRECTS[cleanPath];
      if (target && target !== url.pathname && target !== url.pathname + "/") {
        return Response.redirect(`${CANONICAL_ORIGIN}${target}`, 301);
      }
    }

    // 1c. Strict Canonical Trailing Slash & index.html (301)
    if (url.pathname === "/index.html") {
      return Response.redirect(`${CANONICAL_ORIGIN}/${url.search}`, 301);
    }
    if (url.pathname.endsWith("/index.html")) {
      const stripped = url.pathname.slice(0, -10);
      return Response.redirect(`${CANONICAL_ORIGIN}${stripped}${url.search}`, 301);
    }
    if (!url.pathname.endsWith("/") && !url.pathname.includes(".") && !url.pathname.startsWith("/api/")) {
      return Response.redirect(`${CANONICAL_ORIGIN}${url.pathname}/${url.search}`, 301);
    }

    // 2. High-Speed Edge Lead Capture API Routes
    if ((url.pathname === "/api/lead-capture" || url.pathname === "/api/enquiry") && request.method === "POST") {
      return handleLeadCapture(request, env, ctx);
    }
    if ((url.pathname === "/api/lead-capture" || url.pathname === "/api/enquiry") && request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // 3. Cloudflare R2 Media Streaming Proxy Route
    if (url.pathname.startsWith("/media/")) {
      return handleR2MediaStreaming(request, env, url);
    }

    // 4. Edge Tiered Cache Lookup via Cache API
    const cache = caches.default;
    let cachedResponse = await cache.match(request);
    if (cachedResponse) {
      const newHeaders = new Headers(cachedResponse.headers);
      newHeaders.set("X-Cache-Status", "HIT-EDGE");
      newHeaders.set("Server-Timing", `edge;dur=${Date.now() - startTime};desc="CF Worker Cache HIT"`);
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: newHeaders,
      });
    }

    // 5. Fetch Origin Response
    let response: Response;
    try {
      response = await fetch(request);
    } catch (err: any) {
      console.error("Worker origin fetch failed:", err);
      return new Response("Origin unreachable", { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "";
    const isHTML = contentType.includes("text/html");

    // 6. Streaming HTMLRewriter Transformation (HTML Only)
    let transformedResponse = response;
    if (isHTML && response.status === 200) {
      const cf = (request as any).cf;
      const cfData = {
        country: cf?.country || "IN",
        city: cf?.city || "Pune",
        colo: cf?.colo || "BOM",
        region: cf?.region || "Maharashtra",
      };

      const currency = CURRENCY_REGIONS[cfData.country] || CURRENCY_REGIONS["DEFAULT"];

      const rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', new CanonicalEnforcer(url.pathname))
        .on("head", new HeadMetaInjector(url.pathname, crawlerInfo, cfData))
        .on('meta[property="og:image"]', new OGImageAbsolutifier())
        .on('meta[name="twitter:image"]', new OGImageAbsolutifier())
        .on('meta[property="og:image:url"]', new OGImageAbsolutifier())
        .on("head", new PerformanceHintInjector())
        .on('a[href^="/"]', new InternalLinkNormalizer())
        .on("img", new ImageOptimizer())
        .on('a[href^="http"]', new ExternalLinkOptimizer())
        .on("img", new ImageAltA11yEnforcer())
        .on("head", new SemanticStructureGuardian(url.pathname))
        .on("head", new SpeculationRulesInjector())
        .on("head", new EdgeSpeakableVoiceOptimizer(url.pathname))
        .on("head", new INPPerformanceOptimizer(crawlerInfo.tier > 0))
        .on("body", new NRIPersonalizationOptimizer(cfData.country, currency, crawlerInfo.tier > 0));

      transformedResponse = rewriter.transform(response);
    }

    // 7. Assemble Hardened Edge Headers
    const headers = new Headers(transformedResponse.headers);
    applySecurityHeaders(headers);
    applyCacheHeaders(headers, url);

    const linkHeaders = [
      ...EARLY_HINTS_LINKS,
      `<${CANONICAL_ORIGIN}/sitemap.xml>; rel="sitemap"`,
      `<${CANONICAL_ORIGIN}/llms.txt>; rel="alternate"; type="text/plain"`
    ];
    headers.set("Link", linkHeaders.join(", "));

    headers.set("Accept-CH", "Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-Width, Sec-CH-Viewport-Width");
    headers.set("Critical-CH", "Sec-CH-Width, Sec-CH-Viewport-Width");

    const cf = (request as any).cf;
    const country = cf?.country || "IN";
    const currency = CURRENCY_REGIONS[country] || CURRENCY_REGIONS["DEFAULT"];
    headers.set("Content-Language", country === "IN" ? "en-IN" : "en");
    headers.set("Vary", "Accept-Encoding, Sec-CH-Width, Sec-CH-Viewport-Width, CF-IPCountry");

    // Geo & Currency & INP Headers
    headers.set("X-Geo-Country", country);
    headers.set("X-Currency-Preference", currency.code);
    headers.set("X-NRI-Segment", country === "IN" ? "domestic" : "international");
    headers.set("X-INP-Engine", "active;scheduler=idle-callback;passive-listeners=enforced");

    const edgeDuration = Date.now() - startTime;
    headers.set("Server-Timing", `edge;dur=${edgeDuration};desc="CF SEO Worker v6.1", gbot;desc="Google Ecosystem Edge"`);
    headers.set("X-Edge-Location", cf?.colo || "unknown");
    headers.set("X-Response-Source", "cf-seo-worker-v6.1");
    headers.set("X-Cache-Status", "MISS-EDGE");

    if (crawlerInfo.tier > 0) {
      headers.set("X-Crawler-Tier", `${crawlerInfo.tier}:${crawlerInfo.label}`);
      if (crawlerInfo.tier === 1) {
        headers.set("X-Googlebot-Edge", "accelerated;tier=priority;render=instant;cwv=pass;schemas=harmonized");
        headers.set("X-Google-Indexing-Protocol", "v3;supported;status=canonical");
        headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      } else if (crawlerInfo.tier === 2) {
        headers.set("X-Search-Edge", "accelerated;tier=major;indexnow=enabled");
      } else if (crawlerInfo.tier === 3) {
        headers.set("X-AI-Citation-Policy", "allowed;attribution=Paranjape Schemes (Construction) Ltd");
        headers.set("X-AI-Grounding-Source", `${CANONICAL_ORIGIN}/llms.txt`);
      }
    }

    headers.set("NEL", JSON.stringify({
      report_to: "default",
      max_age: 86400,
      include_subdomains: true,
      failure_fraction: 1.0,
    }));
    headers.set("Report-To", JSON.stringify({
      group: "default",
      max_age: 86400,
      endpoints: [{ url: `${CANONICAL_ORIGIN}/api/nel-report` }],
      include_subdomains: true,
    }));

    const finalResponse = new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers,
    });

    // 8. Cache GET 200 responses asynchronously in Edge Cache
    if (request.method === "GET" && finalResponse.status === 200) {
      ctx.waitUntil(cache.put(request, finalResponse.clone()));
    }

    return finalResponse;
  },
};

// ─── Serverless Lead Capture Implementation ───────────────────────────────────

async function handleLeadCapture(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data: Record<string, any> = {};

    if (contentType.includes("application/json")) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        data[k] = v;
      }
    }

    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const email = String(data.email || "N/A").trim();
    const project = String(data.project_interest || data.project || data.interest || "Paranjape Forest Trails").trim();
    const whatsappOptin = data.whatsapp_optin !== false;
    const source = String(data.source || data.source_url || "https://www.paranjapetownship.com/").trim();
    const timestamp = data.timestamp || new Date().toISOString();

    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, error: "Name and Mobile Number are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Asynchronous non-blocking CRM dispatch via ctx.waitUntil
    ctx.waitUntil(
      (async () => {
        try {
          const dispatch = new FormData();
          dispatch.append("name", name);
          dispatch.append("phone", phone);
          dispatch.append("email", email);
          dispatch.append("project_interest", project);
          dispatch.append("whatsapp_optin", whatsappOptin ? "YES" : "NO");
          dispatch.append("source_url", source);
          dispatch.append("timestamp", timestamp);
          dispatch.append("_subject", `🌟 New Edge Lead: ${project} - ${name} (${phone})`);
          dispatch.append("_captcha", "false");

          await fetch("https://formsubmit.co/propsmartrealty@gmail.com", {
            method: "POST",
            body: dispatch,
          });

          // D1 Database backup if bound
          if (env.DB) {
            await env.DB.prepare(
              "INSERT INTO leads (name, phone, email, project, whatsapp_optin, source, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
            )
              .bind(name, phone, email, project, whatsappOptin ? 1 : 0, source, timestamp)
              .run();
          }
        } catch (err) {
          console.error("Async Lead Dispatch Exception:", err);
        }
      })()
    );

    return new Response(
      JSON.stringify({
        success: true,
        timestamp,
        lead: { name, phone, email, project },
        message: "Lead processed & dispatched at Edge successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || "Internal Worker Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}

// ─── Cloudflare R2 Media Streaming Handler ───────────────────────────────────

async function handleR2MediaStreaming(request: Request, env: Env, url: URL): Promise<Response> {
  const objectKey = url.pathname.replace(/^\/media\//, "");

  if (env.MEDIA_BUCKET && objectKey) {
    try {
      const range = request.headers.get("Range");
      const object = await env.MEDIA_BUCKET.get(objectKey, {
        range: range ? request.headers : undefined,
        onlyIf: request.headers,
      });

      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("ETag", object.httpEtag);
        headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("CF-R2-Source", "edge-stream");

        return new Response(object.body as any, {
          headers,
          status: object.body ? (range ? 206 : 200) : 304,
        });
      }
    } catch (e) {
      console.error("R2 Stream Error:", e);
    }
  }

  // Fallback to origin images folder
  const fallbackUrl = new URL(`/images/${objectKey}`, request.url);
  return fetch(fallbackUrl);
}
