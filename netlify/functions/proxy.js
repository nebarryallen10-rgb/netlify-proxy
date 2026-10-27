exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const response = await fetch('https://opencode.ai/zen/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': event.headers.authorization || 'Bearer public',
        'User-Agent': 'opencode/1.18.31',
        'x-opencode-client': 'cli'
      },
      body: event.body,
    });

    const data = await response.text();
    return {
      statusCode: response.status,
      body: data,
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
