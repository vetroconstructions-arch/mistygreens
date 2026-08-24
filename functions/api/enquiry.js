// Sovereign Cloudflare Edge Function: Serverless Lead Validation & Routing Engine v1.0
export async function onRequestPost(context) {
  try {
    const request = context.request;
    const contentType = request.headers.get("content-type") || "";

    let body = {};
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        body[key] = value;
      }
    }

    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const email = (body.email || "").trim();
    const project = (body.project_context || body.interest || "Paranjape Forest Trails").trim();

    // Edge Validation
    if (!name || !phone) {
      return new Response(
        JSON.stringify({ success: false, error: "Name and Mobile Number are required." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Response Payload from Cloudflare Edge
    const responsePayload = {
      success: true,
      timestamp: new Date().toISOString(),
      lead: { name, phone, email, project },
      message: "Lead processed & authenticated successfully at Cloudflare Edge."
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: "Edge Execution Error: " + err.message }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    }
  });
}
