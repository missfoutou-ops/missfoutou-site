const fetch = require("node-fetch");

exports.handler = async function () {
  const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
  const FORM_ID = process.env.FORM_ID;

  if (!NETLIFY_TOKEN || !FORM_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing environment variables" })
    };
  }

  try {
    const response = await fetch(
      https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions,
      {
        headers: {
          Authorization: Bearer ${NETLIFY_TOKEN}
        }
      }
    );

    const submissions = await response.json();

    const reviews = submissions.map((entry) => ({
      name: entry.data.name,
      rating: entry.data.rating,
      message: entry.data.message,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(reviews)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
