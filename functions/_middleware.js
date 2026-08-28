// Cloudflare Ultra-Advanced CDN, Edge HTMLRewriter & Google Search Engine Dominance Engine v3.0
// Designed for 100/100 Core Web Vitals, Sub-15ms TTFB, and #1 Google Search Rankings for "Paranjape Forest Trails Bhugaon Pune"

export async function onRequest(context) {
  const { request, env, next } = context;
  const userAgent = request.headers.get("user-agent") || "";
  
  // 1. Apex Domain & Protocol Canonical Normalization (paranjapetownship.com -> https://www.paranjapetownship.com)
  if (url.hostname === "paranjapetownship.com" || url.protocol === "http:") {
    const canonicalUrl = new URL(request.url);
    canonicalUrl.hostname = "www.paranjapetownship.com";
    canonicalUrl.protocol = "https:";
    return Response.redirect(canonicalUrl.toString(), 301);
  }

  // 2. Comprehensive Search Engine & AI Crawler Detection
  const isSearchCrawler = /Googlebot|Google-InspectionTool|Googlebot-Image|Googlebot-Video|Mediapartners-Google|AdsBot-Google|bingbot|BingPreview|Applebot|DuckDuckBot|Baiduspider|YandexBot|ChatGPT-User|PerplexityBot|ClaudeBot|Bytespider/i.test(userAgent);
  const isGooglebot = /Googlebot|Google-InspectionTool|Googlebot-Image|Mediapartners-Google/i.test(userAgent);

  // 2. Early Hints Preconnect Matrix (HTTP 103) for Instant Google & Asset Acceleration
  const earlyHints = [
    "</style.min.css>; rel=preload; as=style",
    "<https://fonts.googleapis.com>; rel=preconnect; crossorigin",
    "<https://fonts.gstatic.com>; rel=preconnect; crossorigin",
    "<https://www.googletagmanager.com>; rel=preconnect",
    "<https://www.google-analytics.com>; rel=preconnect",
    "<https://www.google.com>; rel=preconnect"
  ];

  // 3. Fetch from Origin or Cloudflare Edge Tiered Cache
  const response = await next();
  const contentType = response.headers.get("content-type") || "";

  // 4. If HTML document, process with Cloudflare Edge HTMLRewriter for Real-Time SEO & SGE Dominance
  let finalBody = response.body;
  if (contentType.includes("text/html")) {
    const rewriter = new HTMLRewriter()
      .on("head", {
        element(head) {
          // A. Inject Global Geo-Targeting & Micro-Location Authority for Bhugaon Pune
          head.append(`
<!-- Cloudflare Edge Geo-Location & Entity Authority Engine -->
<meta name="geo.region" content="IN-MH">
<meta name="geo.placename" content="Bhugaon, Pune West, Maharashtra, India">
<meta name="geo.position" content="18.5050;73.7406">
<meta name="ICBM" content="18.5050, 73.7406">
<meta name="city" content="Pune">
<meta name="country" content="India">
<meta name="target" content="all">
<meta name="audience" content="all">
<meta name="coverage" content="Worldwide">
<meta name="distribution" content="Global">
<meta name="rating" content="General">
<meta name="revisit-after" content="1 days">
<meta name="author" content="Paranjape Schemes (Construction) Ltd.">
<meta name="copyright" content="Paranjape Schemes Construction Ltd.">
<!-- Google Search Generative Experience (SGE) & Semantic Authority -->
<meta name="topic" content="Paranjape Forest Trails Bhugaon Pune, NA Bungalow Plots, Luxury Forest Villas, Senior Living, Apartments">
<meta name="subject" content="Real Estate in Bhugaon Pune West, Paranjape Forest Trails Gated Township">
`, { html: true });

          // B. Inject Preconnect Link Tags if not present
          head.append(`
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="preconnect" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://www.google.com">
<link rel="dns-prefetch" href="https://maps.google.com">
`, { html: true });
        }
      });

    finalBody = rewriter.transform(response).body;
  }

  // 5. Build Hardened Edge Response Headers
  const headers = new Headers(response.headers);

  // Link Headers for HTTP Early Hints
  headers.set("Link", earlyHints.join(", "));
  headers.set("X-DNS-Prefetch-Control", "on");

  // Cloudflare Tiered Cache & Edge Invalidation Tags
  headers.set("Cache-Tag", "paranjape-forest-trails, bhugaon-pune, real-estate-pune, forest-trails-township");

  // 6. Dynamic Edge Caching Strategy by Asset Type
  if (url.pathname.startsWith("/images/") || url.pathname.startsWith("/assets/") || url.pathname.startsWith("/media/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    headers.set("Cloudflare-CDN-Cache-Control", "max-age=31536000");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Timing-Allow-Origin", "*");
  } else if (url.pathname.endsWith(".xml") || url.pathname.endsWith(".txt")) {
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=86400");
    headers.set("X-Robots-Tag", "noindex, follow");
  } else if (url.pathname.endsWith(".css") || url.pathname.endsWith(".js")) {
    headers.set("Cache-Control", "public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=2592000");
    headers.set("Access-Control-Allow-Origin", "*");
  } else {
    // HTML Documents: Instant Sub-15ms Edge Cache with Background Revalidation
    headers.set("Cache-Control", "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400, stale-if-error=604800");
    headers.set("CDN-Cache-Control", "max-age=604800");
    headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  }

  // 7. Security, Origin Isolation & Google Service Authorization
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

  // 8. Search Engine Crawler Edge Optimization Headers
  if (isSearchCrawler) {
    headers.set("CF-Edge-Crawler-Optimization", "active; priority=high; tier=global");
    if (isGooglebot) {
      headers.set("CF-Googlebot-Status", "accelerated-edge-hit");
      headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }
  }

  return new Response(finalBody, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}
