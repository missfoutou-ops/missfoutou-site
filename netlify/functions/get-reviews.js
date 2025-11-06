const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
  const FORM_ID = process.env.FORM_ID;

  if (!NETLIFY_TOKEN || !FORM_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing NETLIFY_TOKEN or FORM_ID" })
    };
  }

  try {
    const res = await fetch(
      https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions,
      {
        headers: { Authorization: Bearer ${NETLIFY_TOKEN} }
      }
    );

    const submissions = await res.json();

    const reviews = submissions.map((item) => ({
      name: item.data.name || "Anonyme",
      rating: item.data.rating || "⭐⭐⭐⭐⭐",
      message: item.data.message || "",
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviews)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
