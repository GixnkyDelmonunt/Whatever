// script.js
const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbW9qdWx3ZWhmdWRsbXFlaGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1OTIsImV4cCI6MjA5NjAxNzU5Mn0.W-lQKy8_R0ygkiJTBhZd03bMkfJW6g0YJ4ELdpLMX-Y';

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  const searchInput = document.getElementById("searchInput");

  // 1. Fetch Players from Supabase
  let players = [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });
    players = await res.json();
  } catch (err) { console.error("DB Load Failed", err); }

  // 2. Render initial grid with loading state
  players.forEach(p => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-username", p.name.toLowerCase());
    card.innerHTML = `<img class="avatar-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" data-user-id="${p.roblox_id}"><div class="avatar-name">${p.name}</div>`;
    
    card.addEventListener("click", () => {
      navigator.clipboard.writeText(p.roblox_id);
    });
    grid.appendChild(card);
  });

  // 3. Chunked Thumbnail Fetching (using your Netlify function)
  const chunkSize = 25;
  for (let i = 0; i < players.length; i += chunkSize) {
    const chunk = players.slice(i, i + chunkSize);
    const ids = chunk.map(p => p.roblox_id).join(",");
    try {
      const res = await fetch(`/.netlify/functions/avatars?userIds=${ids}`);
      const data = await res.json();
      data.data.forEach(avatar => {
        const img = document.querySelector(`img[data-user-id="${avatar.targetId}"]`);
        if (img) img.src = avatar.imageUrl;
      });
    } catch (e) { console.error("Thumbnail fetch failed", e); }
  }
});
