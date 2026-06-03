// 1. Initial configuration
const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbW9qdWx3ZWhmdWRsbXFlaGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1OTIsImV4cCI6MjA5NjAxNzU5Mn0.W-lQKy8_R0ygkiJTBhZd03bMkfJW6g0YJ4ELdpLMX-Y';

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  const searchInput = document.getElementById("searchInput");
  if (!grid || !searchInput) return;

  // A. Fetch players from Supabase
  let players = [];
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });
    players = await response.json();
  } catch (err) {
    console.error("Failed to load players from Supabase:", err);
  }

  // B. Toast notification setup
  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  // (Include the styles for toastContainer here from your snippet)
  document.body.appendChild(toastContainer);

  function showNotification(text) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;
    // (Include the styles for toast here from your snippet)
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 1900);
  }

  // C. Render cards with placeholders
  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-user-id", player.roblox_id);
    card.setAttribute("data-username", player.name.toLowerCase());

    card.addEventListener("click", () => {
      navigator.clipboard.writeText(player.roblox_id.toString());
      showNotification(`ID ${player.roblox_id} copied!`);
    });

    const img = document.createElement("img");
    img.className = "avatar-img";
    img.src = "https://via.placeholder.com/420x420?text=Loading";
    img.setAttribute("data-user-id", player.roblox_id);

    const name = document.createElement("div");
    name.className = "avatar-name";
    name.textContent = player.name;

    card.appendChild(img);
    card.appendChild(name);
    grid.appendChild(card);
  });

  // D. Search filtering
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    Array.from(grid.children).forEach((card) => {
      const username = card.getAttribute("data-username");
      card.style.display = username.includes(query) ? "" : "none";
    });
  });

  // E. Chunked Avatar Fetching
  const chunkSize = 25;
  for (let i = 0; i < players.length; i += chunkSize) {
    const chunk = players.slice(i, i + chunkSize);
    const userIds = chunk.map(p => p.roblox_id).join(",");

    try {
      const res = await fetch(`/.netlify/functions/avatars?userIds=${userIds}`);
      const data = await res.json();
      data.data.forEach((avatar) => {
        const img = document.querySelector(`img[data-user-id="${avatar.targetId}"]`);
        if (img) img.src = avatar.imageUrl;
      });
    } catch (err) { console.error("Chunk fetch error:", err); }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
});

// Admin Modal Toggle (Ctrl + Q)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'q') {
    const modal = document.getElementById('adminModal');
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
  }
});
