exports.handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const formspreeId = process.env.FORMSPREE_ID;
  if (!formspreeId) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Formspree ID not configured." }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Invalid JSON." }),
    };
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        _subject: `UB Workshop Complete — ${body.name}`,
        name: body.name,
        completed_at: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
        declaration: body.declaration,
        poem: body.poem || "(not submitted)",
        pitch: body.pitch || "(not submitted)",
        goals: body.goals || "(not submitted)",
        vision: body.vision || "(not submitted)",
        budget_result: body.budget || "(not submitted)",
        excited_about: body.preview || "(not submitted)",
        alumni_reflection: body.alumni || "(not submitted)",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Formspree error:", err);
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Could not send submission." }),
      };
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("Submit error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Server error." }),
    };
  }
};
