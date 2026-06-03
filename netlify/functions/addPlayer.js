const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  const { password, name, roblox_id } = JSON.parse(event.body);

  // Check password
  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 403, body: "Unauthorized" };
  }

  // Check if ID already exists
  const { data: existingPlayer, error: fetchError } = await supabase
    .from('players')
    .select('roblox_id')
    .eq('roblox_id', roblox_id)
    .maybeSingle();

  if (fetchError) return { statusCode: 500, body: JSON.stringify(fetchError) };

  if (existingPlayer) {
    return { 
      statusCode: 409, 
      body: JSON.stringify({ message: "ID already exists in the hitlist." }) 
    };
  }

  // If no existing ID, proceed with insertion
  const { data, error } = await supabase
    .from('players')
    .insert([{ name, roblox_id }]);

  if (error) return { statusCode: 500, body: JSON.stringify(error) };
  return { statusCode: 200, body: JSON.stringify({ message: "Success" }) };
};
