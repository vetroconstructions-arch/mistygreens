// Cloudflare R2 Media Object Storage Edge Gateway v1.0
// Serves images, brochures, and media assets directly from Cloudflare R2 with global edge caching

export async function onRequestGet(context) {
  const { request, env, params } = context;
  const pathArray = params.path || [];
  const objectKey = pathArray.join("/");

  if (!objectKey) {
    return new Response("Media key missing", { status: 400 });
  }

  // 1. Check if Cloudflare R2 Bucket Binding (MEDIA_BUCKET / R2_STORAGE) is available
  const r2Bucket = env.MEDIA_BUCKET || env.R2_STORAGE;

  if (r2Bucket) {
    try {
      const object = await r2Bucket.get(objectKey);

      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("ETag", object.httpEtag);
        headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("CF-R2-Source", "edge-hit");

        return new Response(object.body, {
          headers: headers,
          status: 200
        });
      }
    } catch (err) {
      console.error("R2 fetch error:", err);
    }
  }

  // 2. Fallback: Fetch from local images/assets folder via origin fetch
  const fallbackUrl = new URL(`/images/${objectKey}`, request.url);
  const fallbackResponse = await fetch(fallbackUrl);

  if (fallbackResponse.status === 200) {
    const headers = new Headers(fallbackResponse.headers);
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CF-R2-Source", "origin-fallback");

    return new Response(fallbackResponse.body, {
      headers: headers,
      status: 200
    });
  }

  return new Response("Object Not Found in R2 or Local Storage", { status: 404 });
}
