// Netlify Function : Récupère les avis du formulaire "avis"
exports.handler = async () => {
  const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
  const NETLIFY_FORM_ID = process.env.NETLIFY_FORM_ID;

  if (!NETLIFY_TOKEN || !NETLIFY_FORM_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing NETLIFY_TOKEN or NETLIFY_FORM_ID" })
    };
  }

  try {
    const response = await fetch(
      https://api.netlify.com/api/v1/forms/${NETLIFY_FORM_ID}/submissions,
      {
        headers: {
          Authorization: Bearer ${NETLIFY_TOKEN}
        }
      }
    );

    const submissions = await response.json();

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

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
