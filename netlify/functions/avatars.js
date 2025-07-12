const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const userIds = event.queryStringParameters?.userIds;
  if (!userIds) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing userIds parameter' }),
    };
  }

  try {
    const response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds}&size=420x420&format=Png&isCircular=false`);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch avatars' }),
    };
  }
};
