// Cloudflare Pages Serverless Edge Function: Lead Capture Engine v1.0
// Route: /api/lead-capture

export async function onRequestPost(context: any) {
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

    // 2. Dispatch to FormSubmit Email Gateway
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email || 'N/A');
    formData.append('project_interest', project || 'Forest Trails');
    formData.append('whatsapp_optin', whatsappOptin ? 'YES' : 'NO');
    formData.append('source_url', source || 'https://www.paranjapetownship.com/');
    formData.append('timestamp', timestamp || new Date().toISOString());
    formData.append('_subject', `🌟 New Website Lead: ${project} - ${name} (${phone})`);
    formData.append('_captcha', 'false');

    const emailResponse = await fetch('https://formsubmit.co/propsmartrealty@gmail.com', {
      method: 'POST',
      body: formData
    });

    // 3. If D1 Database is bound in Cloudflare dashboard, persist lead
    if (env.DB) {
      try {
        await env.DB.prepare(
          'INSERT INTO leads (name, phone, email, project, whatsapp_optin, source, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(name, phone, email, project, whatsappOptin ? 1 : 0, source, timestamp).run();
      } catch (dbErr) {
        console.warn('D1 persistence skipped:', dbErr);
      }
    }

    return new Response(JSON.stringify({ success: true, message: 'Lead captured successfully at edge' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache'
      }
    });
  } catch (error: any) {
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
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
