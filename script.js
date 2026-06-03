document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  const searchInput = document.getElementById("searchInput");
  if (!grid || !searchInput) return;

  // Configuration for Supabase
  const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbW9qdWx3ZWhmdWRsbXFlaGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1OTIsImV4cCI6MjA5NjAxNzU5Mn0.W-lQKy8_R0ygkiJTBhZd03bMkfJW6g0YJ4ELdpLMX-Y';

  // 1. Fetch data from Supabase
  async function fetchPlayers() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });
    return await response.json();
  }

  const players = await fetchPlayers();

  // 2. Render cards
  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-username", player.name.toLowerCase());
    
    // Copy-to-clipboard functionality
    card.addEventListener("click", () => {
      navigator.clipboard.writeText(player.roblox_id.toString());
      alert(`Copied ID: ${player.roblox_id}`); // Or use your showNotification() function
    });

    card.innerHTML = `
      <img src="https://via.placeholder.com/420x420?text=Loading" data-user-id="${player.roblox_id}" class="avatar-img">
      <div class="avatar-name">${player.name}</div>
    `;
    grid.appendChild(card);
  });

  // 3. Search Bar Logic (Fixed)
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".avatar-card").forEach(card => {
      card.style.display = card.getAttribute("data-username").includes(query) ? "" : "none";
    });
  });

  // 4. Chunked Avatar Fetching
  const chunkSize = 25;
  for (let i = 0; i < players.length; i += chunkSize) {
    const chunk = players.slice(i, i + chunkSize);
    const userIds = chunk.map(p => p.roblox_id).join(",");
    
    try {
      const res = await fetch(`/.netlify/functions/avatars?userIds=${userIds}`);
      const data = await res.json();
      data.data.forEach(avatar => {
        const img = document.querySelector(`img[data-user-id="${avatar.targetId}"]`);
        if (img) img.src = avatar.imageUrl;
      });
    } catch (err) {
      console.error("Failed to load avatars", err);
    }
  }
});
