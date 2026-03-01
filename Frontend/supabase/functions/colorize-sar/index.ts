const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No image provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('CUTOUT_PRO_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Forward to cutout.pro API (correct endpoint for colorization)
    const proxyForm = new FormData();
    proxyForm.append('file', file, file.name);

    const apiResponse = await fetch('https://www.cutout.pro/api/v1/matting?mattingType=19', {
      method: 'POST',
      headers: {
        'APIKEY': apiKey,
      },
      body: proxyForm,
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('API error:', apiResponse.status, errorText);
      return new Response(JSON.stringify({ error: 'Colorization failed. Please try again.' }), {
        status: apiResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if response is JSON (error) or binary (image)
    const contentType = apiResponse.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const jsonResponse = await apiResponse.json();
      console.error('API returned JSON error:', jsonResponse);
      const errorMsg = jsonResponse.msg || jsonResponse.message || 'Colorization failed';
      return new Response(JSON.stringify({ error: errorMsg }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // API returns binary PNG image - convert to base64 data URL
    const imageBuffer = await apiResponse.arrayBuffer();
    const uint8Array = new Uint8Array(imageBuffer);
    
    // Check if the binary data is actually a JSON error response
    try {
      const textDecoder = new TextDecoder();
      const text = textDecoder.decode(uint8Array);
      const parsed = JSON.parse(text);
      if (parsed.code && parsed.msg) {
        console.error('API returned error as binary:', parsed);
        return new Response(JSON.stringify({ error: parsed.msg }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (_) {
      // Not JSON, proceed as binary image
    }

    // Convert to base64 in chunks to avoid stack overflow
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    const base64 = btoa(binary);
    const dataUrl = `data:image/png;base64,${base64}`;

    return new Response(JSON.stringify({ imageUrl: dataUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
