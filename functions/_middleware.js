/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Cloudflare Pages Edge SEO Dominance Engine v5.0
 * Domain: https://www.paranjapetownship.com
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Ultra-Advanced HTMLRewriter Pipeline:
 *  1. Domain & Protocol Canonicalization (301)
 *  2. 4-Tier Crawler Intelligence Classification
 *  3. 6x Streaming HTMLRewriter Transformations
 *  4. Edge Performance Instrumentation (Server-Timing)
 *  5. Hardened Security Header Matrix
 *  6. Tiered Edge Cache Strategy (Assets / HTML / XML)
 *  7. Geo & Language Intelligence (cf.country)
 *  8. Network Error Logging (NEL)
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const CANONICAL_HOSTNAME = "www.paranjapetownship.com";
const CANONICAL_ORIGIN = "https://www.paranjapetownship.com";

// Permanent canonical routing for legacy enclaves & facilities
const PERMALINK_REDIRECTS = {
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
  "/orchard": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
  "/swaniketan": "/paranjape-forest-trails-township-bhugaon-swaniketan/",
  "/the-cliff-lifestyle-hub": "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
  "/cliff-club": "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
  "/sri-sri-ravishankar-school": "/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/",
  "/ssrvm-school": "/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/",
  "/equestrian-academy": "/paranjape-forest-trails-township-bhugaon-amenities/equestrian-academy-pune/",
  "/paranjape-forest-trails-township-bhugaon-villas-plots.html": "/paranjape-forest-trails-township-bhugaon-villas-plots/",
  "/paranjape-forest-trails-township-bhugaon-facilities.html": "/paranjape-forest-trails-township-bhugaon-facilities/",
};

// ─── Edge Keyword Routing Table ───────────────────────────────────────────────
// Maps URL path prefixes → page-specific keyword cluster injected at edge
const BRAND_KW = "Paranjape Schemes Construction Ltd, Paranjape Forest Trails Bhugaon, Misty Greens NA Plots, The Rivolo Villas, The Canopy Apartments, Highgardens, The Cove Bungalows, Athashri Senior Living, Everglades Bavdhan, RERA approved Bhugaon, MahaRERA P52100053834, 190-acre gated township Pune West";

const KEYWORD_ROUTES = {
  "/": `NA plots Bhugaon, luxury villas Bhugaon, 2BHK in Bhugaon, 3BHK Pune West, property in Bhugaon, gated township Pune West, NA bungalow plots Pune, buy property near Kothrud Bavdhan, NRI investment Bhugaon, RERA approved plots Bhugaon, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-misty-greens": `NA plots in Bhugaon, NA bungalow plots Bhugaon, buy NA plots Bhugaon, NA plots price Bhugaon 2026, RERA NA plots Bhugaon P52100053834, Misty Greens NA plots, plots near Chandani Chowk, plots near Bavdhan Kothrud, ${BRAND_KW}`,
  "/misty-greens": `NA plots in Bhugaon, NA bungalow plots Bhugaon, Misty Greens NA plots, RERA NA plots P52100053834, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-rivolo-residences": `luxury villas Bhugaon, luxury forest villas Pune, 4BHK villa Bhugaon, 5BHK villa Bhugaon, Rivolo villas price 2026, NRI luxury villa Bhugaon, luxury villa near Bavdhan Kothrud, RERA villa Bhugaon P52100031560, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-the-cove": `twin bungalows Bhugaon, twin bungalow price Bhugaon 2026, 4BHK twin bungalow Pune West, The Cove bungalows Forest Trails, bungalow near Bavdhan Kothrud, RERA bungalow P52100048536, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-the-canopy": `2BHK in Bhugaon, 3BHK in Bhugaon, 2BHK near Bavdhan, 3BHK near Kothrud, The Canopy apartments Bhugaon, RERA apartments P52100079518, apartments near Chandani Chowk, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-highgardens": `2BHK in Bhugaon, apartments Bhugaon, Highgardens apartments price 2026, RERA apartments P52100053310, 2BHK near Bavdhan, 2BHK near Chandani Chowk, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon": `senior living Bhugaon, Athashri senior living Pune, retirement homes Bhugaon, senior citizen homes Pune West, assisted living Bhugaon, RERA senior living P52100077686, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-verandah": `luxury apartments Bhugaon, Verandah Forest Trails price, apartments near Bavdhan Kothrud, RERA apartments P52100002194, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-orchard-residences": `apartments Bhugaon, Orchard Residences price, RERA apartments P52100055710, apartments near Chandani Chowk Bavdhan, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-swaniketan": `apartments Bhugaon, Swaniketan price, RERA apartments P52100052124, flats near Bavdhan Kothrud, ${BRAND_KW}`,
  "/1-bhk-flats-near-bavdhan": `1BHK near Bavdhan, 1 BHK flats near Bavdhan Pune, 1BHK apartments Bavdhan, 1BHK price Bavdhan 2026, affordable 1BHK Bavdhan, 1BHK near Chandani Chowk, ${BRAND_KW}`,
  "/1-bhk-flats-near-kothrud": `1BHK near Kothrud, 1 BHK flats Kothrud, 1BHK price Kothrud 2026, affordable 1BHK Kothrud, ${BRAND_KW}`,
  "/1-bhk-flats-near-hinjewadi": `1BHK near Hinjewadi, 1 BHK flats Hinjewadi IT Park, 1BHK price Hinjewadi 2026, ${BRAND_KW}`,
  "/2-bhk-flats-near-bavdhan": `2BHK near Bavdhan, 2 BHK flats near Bavdhan Pune, 2BHK apartments Bavdhan, 2BHK price Bavdhan 2026, 2BHK RERA Bavdhan, 2BHK near Chandani Chowk, ${BRAND_KW}`,
  "/2-bhk-flats-near-kothrud": `2BHK near Kothrud, 2 BHK flats Kothrud, 2BHK apartments Kothrud, 2BHK price Kothrud 2026, 2BHK RERA Kothrud, 2BHK Kothrud extension, ${BRAND_KW}`,
  "/2-bhk-flats-near-baner": `2BHK near Baner, 2 BHK flats Baner, 2BHK apartments Baner, 2BHK price Baner 2026, ${BRAND_KW}`,
  "/3-bhk-flats-near-bavdhan": `3BHK near Bavdhan, 3 BHK flats near Bavdhan Pune, 3BHK apartments Bavdhan, 3BHK price Bavdhan 2026, luxury 3BHK Bavdhan, 3BHK near Chandani Chowk, ${BRAND_KW}`,
  "/3-bhk-flats-near-kothrud": `3BHK near Kothrud, 3 BHK flats Kothrud, 3BHK apartments Kothrud, 3BHK price Kothrud 2026, luxury 3BHK Kothrud, ${BRAND_KW}`,
  "/4-bhk-luxury-apartments-pune-west": `4BHK luxury apartments Pune West, 4 BHK flats Pune West, 4BHK price Pune West 2026, luxury 4BHK Bhugaon, ${BRAND_KW}`,
  "/2bhk-in-bhugaon": `2BHK in Bhugaon, 2 BHK flat Bhugaon, 2BHK apartment Bhugaon, buy 2BHK Bhugaon, 2BHK price Bhugaon 2026, 2BHK RERA Bhugaon, ${BRAND_KW}`,
  "/3bhk-in-pune": `3BHK in Pune, 3 BHK flat Pune, 3BHK apartment Pune, buy 3BHK Pune West, 3BHK price Pune 2026, ${BRAND_KW}`,
  "/3bhk-in-kothrud": `3BHK in Kothrud, 3 BHK flat Kothrud Pune, buy 3BHK Kothrud, 3BHK price Kothrud 2026, ${BRAND_KW}`,
  "/3bhk-near-chandani-chowk": `3BHK near Chandani Chowk, 3 BHK flat Chandani Chowk, buy 3BHK Chandani Chowk, 3BHK price Chandani Chowk 2026, ${BRAND_KW}`,
  "/na-plots-in-bhugaon": `NA plots in Bhugaon, NA bungalow plots Bhugaon, buy NA plots Bhugaon, NA plots price Bhugaon 2026, RERA NA plots Bhugaon P52100053834, ${BRAND_KW}`,
  "/na-plots-in-pune": `NA plots in Pune, NA bungalow plots Pune West, buy NA plots Pune, NA plots price Pune 2026, ${BRAND_KW}`,
  "/plots-in-pune-west": `plots in Pune West, buy plots Pune West, bungalow plots Pune West, NA plots Pune West 2026, ${BRAND_KW}`,
  "/rera-approved-plots-bhugaon": `RERA approved plots Bhugaon, MahaRERA plots Bhugaon, MahaRERA P52100053834, RERA certified plots Pune, ${BRAND_KW}`,
  "/property-in-bhugaon": `property in Bhugaon, buy property Bhugaon Pune, flats in Bhugaon, villas in Bhugaon, plots in Bhugaon, Bhugaon property price 2026, ${BRAND_KW}`,
  "/property-near-chandani-chowk": `property near Chandani Chowk, buy property Chandani Chowk Pune, flats near Chandani Chowk, property price Chandani Chowk 2026, ${BRAND_KW}`,
  "/luxury-villas-bhugaon": `luxury villas Bhugaon, luxury forest villas Bhugaon, 4BHK villa Bhugaon, 5BHK villa Bhugaon, Rivolo villas Bhugaon, ${BRAND_KW}`,
  "/5bhk-villas-pune-west": `5BHK villa Pune West, 5BHK bungalow Pune West, 5BHK luxury villa Bhugaon, ${BRAND_KW}`,
  "/senior-living-bhugaon": `senior living Bhugaon, retirement homes Bhugaon Pune, Athashri Bhugaon, senior citizen homes Pune West, ${BRAND_KW}`,
  "/nri-investment-bhugaon": `NRI investment Bhugaon, NRI property Bhugaon Pune, NRI plots Bhugaon, NRI villas Bhugaon, NRI real estate Pune West, ${BRAND_KW}`,
  "/ready-to-move-flats-bavdhan": `ready to move flats Bavdhan, ready possession flats Bavdhan, ready to move 2BHK Bavdhan, ready possession Chandani Chowk, ${BRAND_KW}`,
  "/under-construction-projects-bhugaon": `under construction projects Bhugaon, new launch Bhugaon Pune, under construction flats Bhugaon, new project Bhugaon 2026, ${BRAND_KW}`,
  "/bavdhan-vs-bhugaon-property-appreciation": `Bavdhan vs Bhugaon property, Bavdhan vs Bhugaon investment, price comparison Pune West 2026, best locality Pune West 2026, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-price": `Paranjape Forest Trails price list 2026, NA plots price Bhugaon, luxury villas price Bhugaon, 2BHK price Bhugaon, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-location-proximity": `Forest Trails location proximity, Bhugaon near Chandani Chowk, Bhugaon near Bavdhan, Bhugaon near Kothrud, ${BRAND_KW}`,
};

// Crawler detection patterns by tier
const CRAWLER_TIERS = {
  tier1: /Googlebot|Google-InspectionTool|Googlebot-Image|Googlebot-Video|Mediapartners-Google|AdsBot-Google|Google-Safety/i,
  tier2: /bingbot|BingPreview|Applebot|DuckDuckBot|Baiduspider|YandexBot|Slurp/i,
  tier3: /ChatGPT-User|GPTBot|PerplexityBot|ClaudeBot|Bytespider|CCBot|anthropic-ai|cohere-ai/i,
  tier4: /WhatsApp|TelegramBot|Slackbot|Discordbot|facebookexternalhit|Twitterbot|LinkedInBot|Pinterestbot/i,
};

// Early Hints preconnect matrix
const EARLY_HINTS_LINKS = [
  "<https://fonts.googleapis.com>; rel=preconnect; crossorigin",
  "<https://fonts.gstatic.com>; rel=preconnect; crossorigin",
  "<https://www.googletagmanager.com>; rel=preconnect",
  "<https://www.google-analytics.com>; rel=preconnect",
];

// ─── Crawler Classification ──────────────────────────────────────────────────

function classifyCrawler(ua) {
  if (CRAWLER_TIERS.tier1.test(ua)) return { tier: 1, label: "google", isSearch: true, isSocial: false };
  if (CRAWLER_TIERS.tier2.test(ua)) return { tier: 2, label: "major-search", isSearch: true, isSocial: false };
  if (CRAWLER_TIERS.tier3.test(ua)) return { tier: 3, label: "ai-crawler", isSearch: false, isSocial: false };
  if (CRAWLER_TIERS.tier4.test(ua)) return { tier: 4, label: "social-preview", isSearch: false, isSocial: true };
  return { tier: 0, label: "user", isSearch: false, isSocial: false };
}

// ─── HTMLRewriter Handler Classes ────────────────────────────────────────────

/**
 * Handler 1: Canonical URL Enforcer
 * Rewrites <link rel="canonical"> to enforce https://www.paranjapetownship.com
 */
class CanonicalEnforcer {
  constructor(pathname) {
    this.pathname = pathname;
  }
  element(el) {
    const href = el.getAttribute("href");
    if (href) {
      // Normalize: force canonical origin, strip trailing index.html
      let cleanPath = this.pathname
        .replace(/\/index\.html$/, "/")
        .replace(/\/$/, "") || "/";
      // Ensure single trailing slash for directories (except root)
      if (cleanPath !== "/" && !cleanPath.includes(".")) {
        cleanPath += "/";
      }
      el.setAttribute("href", CANONICAL_ORIGIN + cleanPath);
    }
  }
}

/**
 * Handler 2: <head> Meta & Resource Injector
 * Appends geo tags, preconnect hints, and hreflang
 */
class HeadMetaInjector {
  constructor(pathname, crawlerInfo, cfData) {
    this.pathname = pathname;
    this.crawlerInfo = crawlerInfo;
    this.cfData = cfData;
  }
  element(head) {
    const cleanPath = this.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    const canonicalUrl = CANONICAL_ORIGIN + (cleanPath === "/" ? "/" : cleanPath + "/");

    // Geo-location meta tags
    const geoBlock = `
<!-- CF Edge SEO Engine v5.0 -->
<meta name="geo.region" content="IN-MH">
<meta name="geo.placename" content="Bhugaon, Pune West, Maharashtra, India">
<meta name="geo.position" content="18.5050;73.7406">
<meta name="ICBM" content="18.5050, 73.7406">
<meta name="author" content="Paranjape Schemes (Construction) Ltd.">
<meta name="copyright" content="© 2026 Paranjape Forest Trails. All Rights Reserved.">`;

    // Preconnect & DNS-prefetch hints
    const preconnectBlock = `
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://formsubmit.co">`;

    // Hreflang for international SEO
    const hreflangBlock = `
<link rel="alternate" hreflang="en-IN" href="${canonicalUrl}">
<link rel="alternate" hreflang="en" href="${canonicalUrl}">
<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">`;

    head.append(geoBlock + preconnectBlock + hreflangBlock, { html: true });
  }
}

/**
 * Handler 7: Keyword Meta Injector
 * Injects page-specific <meta name="keywords"> at the edge using KEYWORD_ROUTES.
 * Runs on ALL HTML responses — covers Astro pages, legacy static files, and new keyword pages.
 * Uses prefix matching so /path/ and /path/index.html both resolve.
 */
class KeywordMetaInjector {
  constructor(pathname) {
    // Normalize: strip trailing slash, strip index.html
    this.cleanPath = pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  }
  element(head) {
    // Exact match first, then prefix match
    let keywords = KEYWORD_ROUTES[this.cleanPath] || KEYWORD_ROUTES[this.cleanPath + "/"] || null;

    // Prefix fallback: find longest matching prefix
    if (!keywords) {
      let bestLen = 0;
      for (const [route, kw] of Object.entries(KEYWORD_ROUTES)) {
        if (route !== "/" && this.cleanPath.startsWith(route) && route.length > bestLen) {
          bestLen = route.length;
          keywords = kw;
        }
      }
    }

    if (keywords) {
      head.append(
        `\n<meta name="keywords" content="${keywords.replace(/"/g, "&quot;")}">`,
        { html: true }
      );
    }
  }
}

/**
 * Handler 3: OG Image Absolutifier
 * Converts relative og:image and twitter:image paths to absolute URLs
 */
class OGImageAbsolutifier {
  element(el) {
    const content = el.getAttribute("content");
    if (content && content.startsWith("/")) {
      el.setAttribute("content", CANONICAL_ORIGIN + content);
    }
  }
}

/**
 * Handler 4: Performance Resource Hint Injector
 * Injects critical typography preload directives and PWA meta
 */
class PerformanceHintInjector {
  element(head) {
    const perfHints = `
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" as="style" crossorigin>
<meta name="theme-color" content="#4A0808">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`;
    head.append(perfHints, { html: true });
  }
}

/**
 * Handler 5: Trailing-Slash <a> Normalizer (Internal Links)
 * Ensures internal navigation links use consistent trailing-slash format
 */
class InternalLinkNormalizer {
  element(el) {
    const href = el.getAttribute("href");
    if (href && href.startsWith("/") && !href.includes(".") && !href.endsWith("/") && href !== "/") {
      el.setAttribute("href", href + "/");
    }
  }
}

/**
 * Handler 6: Image Lazy-Load & Decoding Enforcer
 * Ensures all images below the fold have loading="lazy" and decoding="async"
 */
class ImageOptimizer {
  constructor() {
    this.imageCount = 0;
  }
  element(el) {
    this.imageCount++;
    // First 2 images are above-the-fold: eager load, high priority
    if (this.imageCount <= 2) {
      el.setAttribute("loading", "eager");
      el.setAttribute("fetchpriority", "high");
      el.removeAttribute("decoding");
    } else {
      // Below the fold: lazy load
      if (!el.getAttribute("loading")) {
        el.setAttribute("loading", "lazy");
      }
      if (!el.getAttribute("decoding")) {
        el.setAttribute("decoding", "async");
      }
    }
  }
}

// ─── Cache Strategy ──────────────────────────────────────────────────────────

function applyCacheHeaders(headers, url) {
  const pathname = url.pathname;

  // Immutable hashed assets (_astro/*)
  if (pathname.startsWith("/_astro/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    return;
  }

  // Static media (images, assets, branding)
  if (pathname.startsWith("/images/") || pathname.startsWith("/assets/") || pathname.startsWith("/media/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    headers.set("Timing-Allow-Origin", "*");
    return;
  }

  // Sitemaps, robots.txt, RSS
  if (pathname.endsWith(".xml") || pathname === "/robots.txt" || pathname.endsWith(".txt")) {
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=86400");
    if (pathname.endsWith(".xml")) {
      headers.set("X-Robots-Tag", "noindex, follow");
    }
    return;
  }

  // CSS & JS bundles
  if (pathname.endsWith(".css") || pathname.endsWith(".js")) {
    headers.set("Cache-Control", "public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=2592000");
    return;
  }

  // HTML pages
  headers.set("Cache-Control", "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400, stale-if-error=604800");
  headers.set("CDN-Cache-Control", "max-age=604800");
  headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
}

// ─── Security Headers ────────────────────────────────────────────────────────

function applySecurityHeaders(headers) {
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
}

// ─── Main Middleware ─────────────────────────────────────────────────────────

export async function onRequest(context) {
  const { request, next } = context;
  const startTime = Date.now();

  try {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    const crawlerInfo = classifyCrawler(userAgent);

    // ┌─────────────────────────────────────────────────────────┐
    // │ 1. Domain & Protocol Canonical Redirect (301)           │
    // └─────────────────────────────────────────────────────────┘
    if (
      url.hostname === "paranjapetownship.com" ||
      url.hostname === "paranjapeplots.com" ||
      url.hostname === "www.paranjapeplots.com" ||
      (url.protocol === "http:" && !url.hostname.includes("localhost") && !url.hostname.includes("127.0.0.1"))
    ) {
      const canonicalUrl = new URL(request.url);
      canonicalUrl.hostname = CANONICAL_HOSTNAME;
      canonicalUrl.protocol = "https:";
      return Response.redirect(canonicalUrl.toString(), 301);
    }

    // ┌─────────────────────────────────────────────────────────┐
    // │ 1b. Legacy Permalink Edge 301 Canonical Routing         │
    // └─────────────────────────────────────────────────────────┘
    const cleanPath = url.pathname.replace(/\/$/, "");
    if (PERMALINK_REDIRECTS[url.pathname] || PERMALINK_REDIRECTS[cleanPath]) {
      const target = PERMALINK_REDIRECTS[url.pathname] || PERMALINK_REDIRECTS[cleanPath];
      return Response.redirect(`${CANONICAL_ORIGIN}${target}`, 301);
    }

    // ┌─────────────────────────────────────────────────────────┐
    // │ 2. Fetch Origin Response                                │
    // └─────────────────────────────────────────────────────────┘
    const response = await next();
    const contentType = response.headers.get("content-type") || "";
    const isHTML = contentType.includes("text/html");

    // ┌─────────────────────────────────────────────────────────┐
    // │ 3. HTMLRewriter Pipeline (HTML responses only)           │
    // └─────────────────────────────────────────────────────────┘
    let transformedResponse = response;

    if (isHTML && response.status === 200) {
      // Extract Cloudflare geo data
      const cfData = {
        country: request.cf?.country || "IN",
        city: request.cf?.city || "Pune",
        colo: request.cf?.colo || "BOM",
        region: request.cf?.region || "Maharashtra",
      };

      const rewriter = new HTMLRewriter()
        // Handler 1: Canonical URL enforcement
        .on('link[rel="canonical"]', new CanonicalEnforcer(url.pathname))
        // Handler 2: Meta, geo, hreflang, and JSON-LD injection
        .on("head", new HeadMetaInjector(url.pathname, crawlerInfo, cfData))
        // Handler 3: OG image absolutification
        .on('meta[property="og:image"]', new OGImageAbsolutifier())
        .on('meta[name="twitter:image"]', new OGImageAbsolutifier())
        .on('meta[property="og:image:url"]', new OGImageAbsolutifier())
        // Handler 4: Performance resource hints
        .on("head", new PerformanceHintInjector())
        // Handler 5: Internal link trailing-slash normalization
        .on('a[href^="/"]', new InternalLinkNormalizer())
        // Handler 6: Image lazy-load optimization
        .on("img", new ImageOptimizer())
        // Handler 7: Page-specific keyword meta injection
        .on("head", new KeywordMetaInjector(url.pathname));

      transformedResponse = rewriter.transform(response);
    }

    // ┌─────────────────────────────────────────────────────────┐
    // │ 4. Build Edge Response Headers                          │
    // └─────────────────────────────────────────────────────────┘
    const headers = new Headers(transformedResponse.headers);

    // Security headers
    applySecurityHeaders(headers);

    // Cache strategy
    applyCacheHeaders(headers, url);

    // Early Hints & preconnect
    headers.set("Link", EARLY_HINTS_LINKS.join(", "));

    // Content-Language based on geo
    const country = request.cf?.country || "IN";
    headers.set("Content-Language", country === "IN" ? "en-IN" : "en");
    headers.set("Vary", "Accept-Encoding");

    // ┌─────────────────────────────────────────────────────────┐
    // │ 5. Performance Instrumentation                          │
    // └─────────────────────────────────────────────────────────┘
    const edgeDuration = Date.now() - startTime;
    headers.set("Server-Timing", `edge;dur=${edgeDuration};desc="CF Edge Rewriter"`);
    headers.set("X-Edge-Location", request.cf?.colo || "unknown");
    headers.set("X-Response-Source", "cf-edge-rewriter-v5");

    // ┌─────────────────────────────────────────────────────────┐
    // │ 6. Crawler-Specific Headers                             │
    // └─────────────────────────────────────────────────────────┘
    if (crawlerInfo.tier > 0) {
      headers.set("X-Crawler-Tier", `${crawlerInfo.tier}:${crawlerInfo.label}`);

      if (crawlerInfo.tier === 1) {
        headers.set("X-Googlebot-Edge", "accelerated;tier=priority;rewriter=active");
      }
    }

    // ┌─────────────────────────────────────────────────────────┐
    // │ 7. Network Error Logging (NEL) for RUM                  │
    // └─────────────────────────────────────────────────────────┘
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

    return new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers,
    });

  } catch (err) {
    // ┌─────────────────────────────────────────────────────────┐
    // │ FAIL-SAFE: Never throw — always fall through to origin  │
    // └─────────────────────────────────────────────────────────┘
    console.error("CF Edge SEO Engine Exception:", err.message, err.stack);
    try {
      return await next();
    } catch (_) {
      return new Response("Service temporarily unavailable", { status: 503 });
    }
  }
}
