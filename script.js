// script.js

// Supabase configuration
const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbW9qdWx3ZWhmdWRsbXFlaGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1OTIsImV4cCI6MjA5NjAxNzU5Mn0.W-lQKy8_R0ygkiJTBhZd03bMkfJW6g0YJ4ELdpLMX-Y';

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  const searchInput = document.getElementById("searchInput");
  if (!grid) return;

  // 1. Fetch Players from Supabase
  const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  const players = await response.json();

  // 2. Toast notification setup (Your UI code)
  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  Object.assign(toastContainer.style, { position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column-reverse", gap: "10px", zIndex: "9999", pointerEvents: "none" });
  document.body.appendChild(toastContainer);

  function showNotification(text) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;
    Object.assign(toast.style, { background: "rgba(20, 20, 20, 0.95)", color: "#fff", padding: "10px 18px", borderRadius: "10px", border: "1px solid #3f3f3f", boxShadow: "0 6px 20px rgba(0,0,0,0.25)", fontSize: "0.9rem", fontWeight: "500", opacity: "0", transition: "opacity 0.3s ease", pointerEvents: "auto" });
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");
    setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 300); }, 1600);
  }

  // 3. Render cards (Using roblox_id from DB)
  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-user-id", player.roblox_id); // Use DB column
    card.setAttribute("data-username", player.name.toLowerCase());

    card.addEventListener("click", () => {
      navigator.clipboard.writeText(player.roblox_id.toString());
      showNotification(`UserID ${player.roblox_id} copied to clipboard.`);
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

  // 4. Search logic
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      Array.from(grid.children).forEach(card => {
        card.style.display = card.getAttribute("data-username").includes(query) ? "" : "none";
      });
    });
  }

  // 5. Chunked Avatar Loading (Matches your previous logic)
  const chunkSize = 25;
  for (let i = 0; i < players.length; i += chunkSize) {
    const chunk = players.slice(i, i + chunkSize);
    const userIds = chunk.map(p => p.roblox_id).join(","); // Use DB column

    try {
      const res = await fetch(`/.netlify/functions/avatars?userIds=${userIds}`);
      const data = await res.json();
      data.data.forEach(avatar => {
        const img = document.querySelector(`img[data-user-id="${avatar.targetId}"]`);
        if (img) img.src = avatar.imageUrl || "https://via.placeholder.com/420x420?text=No+Avatar";
      });
    } catch (err) { console.error("Avatar fetch failed", err); }
    await new Promise(r => setTimeout(r, 500));
  }
});
