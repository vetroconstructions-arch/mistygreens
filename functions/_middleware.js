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
        .on("img", new ImageOptimizer());

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
