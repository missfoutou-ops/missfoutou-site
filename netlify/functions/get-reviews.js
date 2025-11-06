export async function handler() {
  const { NETLIFY_TOKEN, NETLIFY_FORM_ID } = process.env;

  if (!NETLIFY_TOKEN || !NETLIFY_FORM_ID) {
    return {
      statusCode: 500,
      body: 'Missing NETLIFY_TOKEN or NETLIFY_FORM_ID'
    };
  }

  const url = https://api.netlify.com/api/v1/forms/${NETLIFY_FORM_ID}/submissions;

  const res = await fetch(url, {
    headers: { Authorization: Bearer ${NETLIFY_TOKEN} }
  });

  const data = await res.json();

  const mapped = data.map(s => ({
    name: s?.data?.name || 'Anonyme',
    rating: Number(s?.data?.rating) || 5,
    message: s?.data?.message || '',
    date: s.created_at
  }));

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapped)
  };
}
