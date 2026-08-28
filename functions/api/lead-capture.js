// Cloudflare Pages Serverless Edge Function: Lead Capture Engine v3.0
// Route: /api/lead-capture

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { name, phone, email, project, whatsappOptin, source, timestamp } = data;

    // 1. Validation
    if (!name || !phone) {
      return new Response(JSON.stringify({ error: 'Name and Phone are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 2. Dispatch to FormSubmit AJAX Gateway with Authenticated Origin Headers
    const payload = {
      name: name,
      phone: phone,
      email: email || 'N/A',
      project_interest: project || 'Paranjape Forest Trails',
      whatsapp_optin: whatsappOptin ? 'YES' : 'NO',
      source_url: source || 'https://www.paranjapetownship.com/',
      timestamp: timestamp || new Date().toISOString(),
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
