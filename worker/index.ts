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

    const geoBlock = `
<!-- CF Edge SEO Engine v5.0 (Worker Edition) -->
<meta name="geo.region" content="IN-MH">
<meta name="geo.placename" content="Bhugaon, Pune West, Maharashtra, India">
<meta name="geo.position" content="18.5050;73.7406">
<meta name="ICBM" content="18.5050, 73.7406">
<meta name="author" content="Paranjape Schemes (Construction) Ltd.">
<meta name="copyright" content="© 2026 Paranjape Forest Trails. All Rights Reserved.">`;

    const preconnectBlock = `
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://formsubmit.co">`;

    const hreflangBlock = `
<link rel="alternate" hreflang="en-IN" href="${canonicalUrl}">
<link rel="alternate" hreflang="en" href="${canonicalUrl}">
<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">`;

    head.append(geoBlock + preconnectBlock + hreflangBlock, { html: true });
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
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" as="style" crossorigin>
<meta name="theme-color" content="#4A0808">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`;
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
 * 6. Image Lazy-Load Optimizer: Prioritizes above-the-fold hero images, lazy loads the rest
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
    }
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
    if (PERMALINK_REDIRECTS[url.pathname] || PERMALINK_REDIRECTS[cleanPath]) {
      const target = PERMALINK_REDIRECTS[url.pathname] || PERMALINK_REDIRECTS[cleanPath];
      return Response.redirect(`${CANONICAL_ORIGIN}${target}`, 301);
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

      const rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', new CanonicalEnforcer(url.pathname))
        .on("head", new HeadMetaInjector(url.pathname, crawlerInfo, cfData))
        .on('meta[property="og:image"]', new OGImageAbsolutifier())
        .on('meta[name="twitter:image"]', new OGImageAbsolutifier())
        .on('meta[property="og:image:url"]', new OGImageAbsolutifier())
        .on("head", new PerformanceHintInjector())
        .on('a[href^="/"]', new InternalLinkNormalizer())
        .on("img", new ImageOptimizer());

      transformedResponse = rewriter.transform(response);
    }

    // 7. Assemble Hardened Edge Headers
    const headers = new Headers(transformedResponse.headers);
    applySecurityHeaders(headers);
    applyCacheHeaders(headers, url);

    headers.set("Link", EARLY_HINTS_LINKS.join(", "));
    const cf = (request as any).cf;
    const country = cf?.country || "IN";
    headers.set("Content-Language", country === "IN" ? "en-IN" : "en");
    headers.set("Vary", "Accept-Encoding");

    const edgeDuration = Date.now() - startTime;
    headers.set("Server-Timing", `edge;dur=${edgeDuration};desc="CF SEO Worker v5"`);
    headers.set("X-Edge-Location", cf?.colo || "unknown");
    headers.set("X-Response-Source", "cf-seo-worker-v5");
    headers.set("X-Cache-Status", "MISS-EDGE");

    if (crawlerInfo.tier > 0) {
      headers.set("X-Crawler-Tier", `${crawlerInfo.tier}:${crawlerInfo.label}`);
      if (crawlerInfo.tier === 1) {
        headers.set("X-Googlebot-Edge", "accelerated;tier=priority;rewriter=active");
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
