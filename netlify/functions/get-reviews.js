// Netlify Function: retourne les avis Netlify Forms en JSON
exports.handler = async function () {
  const { NETLIFY_TOKEN, NETLIFY_FORM_ID } = process.env;

  if (!NETLIFY_TOKEN || !NETLIFY_FORM_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing NETLIFY_TOKEN or NETLIFY_FORM_ID" })
    };
  }

  try {
    const url = https://api.netlify.com/api/v1/forms/${NETLIFY_FORM_ID}/submissions;
    const res = await fetch(url, {
      headers: { Authorization: Bearer ${NETLIFY_TOKEN} }
    });

    if (!res.ok) {
      const text = await res.text();
      return { statusCode: res.status, body: text };
    }

    const submissions = await res.json();

    const reviews = submissions.map(item => ({
      name: item?.data?.name || "Anonyme",
      rating: Number(item?.data?.rating) || 5,
      message: item?.data?.message || "",
      date: item?.created_at
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviews)
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
