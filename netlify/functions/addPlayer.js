// netlify/functions/addPlayer.js
const { createClient } = require('@supabase/supabase-js');

// Use environment variables instead of hardcoding keys
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  const { password, name, roblox_id } = JSON.parse(event.body);

  // Securely check password against environment variable
  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 403, body: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from('players')
    .insert([{ name, roblox_id }]);

  if (error) return { statusCode: 500, body: JSON.stringify(error) };
  return { statusCode: 200, body: JSON.stringify({ message: "Success" }) };
};
