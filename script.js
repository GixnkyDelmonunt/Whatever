// script.js
const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Ensure this is your actual key

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  const searchInput = document.getElementById("searchInput");
  if (!grid || !searchInput) return;

  // 1. Fetch Players from Supabase
  let players = [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });
    // Map database column 'roblox_id' to 'id' so your existing logic works
    const data = await res.json();
    players = data.map(p => ({ name: p.name, id: p.roblox_id }));
  } catch (err) {
    console.error("Failed to fetch from DB:", err);
  }

  // 2. Setup Toast Notifications
  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  Object.assign(toastContainer.style, { position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column-reverse", gap: "10px", zIndex: "9999", pointerEvents: "none" });
  document.body.appendChild(toastContainer);

  function showNotification(text) {
    const toast = document.createElement("div");
    toast.textContent = text;
    Object.assign(toast.style, { background: "rgba(20, 20, 20, 0.95)", color: "#fff", padding: "10px 18px", borderRadius: "10px", border: "1px solid #3f3f3f", fontSize: "0.9rem", opacity: "0", transition: "opacity 0.3s ease", pointerEvents: "auto" });
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");
    setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 300); }, 1600);
  }

  // 3. Render Initial Grid
  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-user-id", player.id);
    card.setAttribute("data-username", player.name.toLowerCase());
    card.innerHTML = `<img class="avatar-img" src="https://via.placeholder.com/420x420?text=Loading" data-user-id="${player.id}"><div class="avatar-name">${player.name}</div>`;
    
    card.addEventListener("click", () => {
      navigator.clipboard.writeText(player.id.toString());
      showNotification(`UserID ${player.id} copied!`);
    });
    grid.appendChild(card);
  });

  // 4. Search Bar Logic
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    Array.from(grid.children).forEach(card => {
      card.style.display = card.getAttribute("data-username").includes(query) ? "" : "none";
    });
  });

  // 5. Fetch Avatars (Chunked)
  const chunkSize = 25;
  for (let i = 0; i < players.length; i += chunkSize) {
    const chunk = players.slice(i, i + chunkSize);
    const userIds = chunk.map(p => p.id).join(",");
    try {
      const res = await fetch(`/.netlify/functions/avatars?userIds=${userIds}`);
      const data = await res.json();
      data.data.forEach(avatar => {
        const img = document.querySelector(`img[data-user-id="${avatar.targetId}"]`);
        if (img) img.src = avatar.imageUrl;
      });
    } catch (e) { console.error("Chunk fetch failed", e); }
    await new Promise(r => setTimeout(r, 500));
  }

  // 6. Ctrl + Q Modal Toggle
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'q') {
      const modal = document.getElementById('adminModal');
      modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
    }
  });
});
// Add this at the very bottom of script.js
window.addPlayer = addPlayer;
