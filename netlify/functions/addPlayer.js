// netlify/functions/addPlayer.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  const { password, name, roblox_id } = JSON.parse(event.body);

  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 403, body: "Unauthorized" };
  }

  // Check if ID already exists
  const { data: existingPlayer } = await supabase
    .from('players')
    .select('roblox_id')
    .eq('roblox_id', roblox_id)
    .maybeSingle();

  if (existingPlayer) {
    return { statusCode: 409, body: "ID already exists" };
  }

  const { data, error } = await supabase
    .from('players')
    .insert([{ name, roblox_id }]);

  if (error) return { statusCode: 500, body: JSON.stringify(error) };
  return { statusCode: 200, body: JSON.stringify({ message: "Success" }) };
};
