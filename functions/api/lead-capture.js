// Cloudflare Pages Serverless Edge Function: Lead Capture Engine v3.1
// Route: /api/lead-capture
// Primary Lead Target: propsmartrealty@gmail.com

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const contentType = request.headers.get("content-type") || "";
    let name = "", phone = "", email = "N/A", project = "Paranjape Forest Trails", whatsappOptin = true, source = "https://www.paranjapetownship.com/", timestamp = new Date().toISOString();
    let isHtmlForm = false;

    if (contentType.includes("application/json")) {
      const data = await request.json();
      name = (data.name || "").trim();
      phone = (data.phone || "").trim();
      email = (data.email || "N/A").trim();
      project = (data.project || data.enclave || data.project_interest || "Paranjape Forest Trails").trim();
      whatsappOptin = data.whatsappOptin !== false && data.whatsappOptin !== "NO";
      source = (data.source || data.source_url || "https://www.paranjapetownship.com/").trim();
      timestamp = data.timestamp || new Date().toISOString();
    } else {
      isHtmlForm = true;
      const formData = await request.formData();
      name = (formData.get("name") || formData.get("full_name") || "").toString().trim();
      phone = (formData.get("phone") || formData.get("mobile") || "").toString().trim();
      email = (formData.get("email") || "N/A").toString().trim();
      project = (formData.get("project") || formData.get("enclave") || formData.get("project_interest") || formData.get("interest") || "Paranjape Forest Trails").toString().trim();
      whatsappOptin = formData.get("whatsappOptin") !== "NO";
      source = (formData.get("source") || formData.get("source_url") || request.headers.get("referer") || "https://www.paranjapetownship.com/").toString().trim();
      timestamp = new Date().toISOString();
    }

    // 1. Validation
    if (!name || !phone) {
      if (isHtmlForm) {
        return new Response("Name and Phone number are required.", { status: 400 });
      }
      return new Response(JSON.stringify({ error: 'Name and Phone are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 2. Dispatch to FormSubmit AJAX Gateway -> propsmartrealty@gmail.com
    const payload = {
      name: name,
      phone: phone,
      email: email || 'N/A',
      project_interest: project || 'Paranjape Forest Trails',
      whatsapp_optin: whatsappOptin ? 'YES' : 'NO',
      source_url: source || 'https://www.paranjapetownship.com/',
      timestamp: timestamp,
      _subject: `🌟 New Website Lead: ${project} - ${name} (${phone})`,
      _captcha: 'false'
    };

    const formSubmitRes = await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://www.paranjapetownship.com',
        'Referer': 'https://www.paranjapetownship.com/'
      },
      body: JSON.stringify(payload)
    });

    const result = await formSubmitRes.json().catch(() => ({}));

    // If HTML form submission without AJAX, redirect to thank-you page
    if (isHtmlForm) {
      return Response.redirect("https://www.paranjapetownship.com/thank-you.html", 303);
    }

    return new Response(JSON.stringify({ success: true, message: 'Lead captured & dispatched to propsmartrealty@gmail.com', gateway: result }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
