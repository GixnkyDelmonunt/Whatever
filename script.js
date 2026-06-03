// script.js
const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbW9qdWx3ZWhmdWRsbXFlaGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1OTIsImV4cCI6MjA5NjAxNzU5Mn0.W-lQKy8_R0ygkiJTBhZd03bMkfJW6g0YJ4ELdpLMX-Y';

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  const searchInput = document.getElementById("searchInput");

  // 1. Toast Notification Setup
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

  // 2. Fetch from Supabase
  let players = [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });
    players = await res.json();
  } catch (err) { console.error("DB Load Failed", err); }

  // 3. Render Grid
  players.forEach(p => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-username", p.name.toLowerCase());
    card.innerHTML = `<img src="https://www.roblox.com/headshot-thumbnail/image?userId=${p.roblox_id}&width=420&height=420&format=png" class="avatar-img"><div class="avatar-name">${p.name}</div>`;
    
    card.addEventListener("click", () => {
      navigator.clipboard.writeText(p.roblox_id);
      showNotification(`Copied: ${p.roblox_id}`);
    });
    grid.appendChild(card);
  });

  // 4. Search Bar Logic
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    Array.from(grid.children).forEach(card => {
      card.style.display = card.getAttribute("data-username").includes(query) ? "" : "none";
    });
  });

  // 5. Ctrl+Q Logic
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'q') {
      const modal = document.getElementById('adminModal');
      modal.style.display = (modal.style.display === 'none') ? 'block' : 'none';
    }
  });
});

// Admin Add Function
window.addPlayer = async () => {
  const password = document.getElementById('passInput').value;
  const name = document.getElementById('nameInput').value;
  const roblox_id = document.getElementById('idInput').value;
  const res = await fetch('/.netlify/functions/addPlayer', {
    method: 'POST',
    body: JSON.stringify({ password, name, roblox_id })
  });
  if (res.ok) { alert('Success!'); location.reload(); }
  else { alert('Unauthorized or Error'); }
};
