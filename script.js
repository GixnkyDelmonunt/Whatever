document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  const searchInput = document.getElementById("searchInput");
  if (!grid || !searchInput) return;

  // 1. Setup Toast Notification
  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  Object.assign(toastContainer.style, { position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column-reverse", gap: "10px", zIndex: "9999", pointerEvents: "none" });
  document.body.appendChild(toastContainer);

  function showNotification(text) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;
    Object.assign(toast.style, { background: "rgba(20, 20, 20, 0.95)", color: "#fff", padding: "10px 18px", borderRadius: "10px", border: "1px solid #3f3f3f", boxShadow: "0 6px 20px rgba(0,0,0,0.25)", fontSize: "0.9rem", transition: "opacity 0.3s ease", pointerEvents: "auto" });
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 300); }, 1600);
  }

  // 2. Fetch data from Supabase
  const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbW9qdWx3ZWhmdWRsbXFlaGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1OTIsImV4cCI6MjA5NjAxNzU5Mn0.W-lQKy8_R0ygkiJTBhZd03bMkfJW6g0YJ4ELdpLMX-Y';

  const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
    headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
  });
  const players = await response.json();

  // 3. Render Cards
  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-user-id", player.roblox_id);
    card.setAttribute("data-username", player.name.toLowerCase());

    card.addEventListener("click", () => {
      navigator.clipboard.writeText(player.roblox_id.toString());
      showNotification(`ID ${player.roblox_id} copied!`);
    });

    card.innerHTML = `
      <img src="https://via.placeholder.com/420x420?text=Loading" class="avatar-img" data-user-id="${player.roblox_id}">
      <div class="avatar-name">${player.name}</div>
    `;
    grid.appendChild(card);
  });

  // 4. Search Filter
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    Array.from(grid.children).forEach(card => {
      card.style.display = card.getAttribute("data-username").includes(query) ? "" : "none";
    });
  });

  // 5. Fetch Avatars in Chunks
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
    } catch (err) { console.error("Avatar fetch failed", err); }
  }
});
