// script.js
const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbW9qdWx3ZWhmdWRsbXFlaGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1OTIsImV4cCI6MjA5NjAxNzU5Mn0.W-lQKy8_R0ygkiJTBhZd03bMkfJW6g0YJ4ELdpLMX-Y';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Load players on startup
  loadPlayers();

  // 2. Ctrl + Q to toggle Modal
  document.addEventListener('keydown', (e) => {
    // Check for Ctrl + Q
    if (e.ctrlKey && (e.key === 'q' || e.key === 'Q')) {
      e.preventDefault(); // Prevents browser defaults
      const modal = document.getElementById('adminModal');
      if (modal) {
        modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
      }
    }
  });
});

async function loadPlayers() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const players = await response.json();
    renderAvatarGrid(players);
  } catch (err) {
    console.error("Failed to load players:", err);
  }
}

function renderAvatarGrid(players) {
  const grid = document.getElementById('avatarGrid');
  if (!grid) return;
  grid.innerHTML = '';
  players.forEach(player => {
    const card = document.createElement('div');
    card.className = 'avatar-card';
    card.innerHTML = `
      <img src="https://www.roblox.com/headshot-thumbnail/image?userId=${player.roblox_id}&width=420&height=420&format=png" class="avatar-img">
      <div class="avatar-name">${player.name}</div>
    `;
    grid.appendChild(card);
  });
}

// Function needs to be globally accessible for the onclick in HTML
window.addPlayer = async function() {
  const password = document.getElementById('passInput').value;
  const name = document.getElementById('nameInput').value;
  const roblox_id = document.getElementById('idInput').value;

  const res = await fetch('/.netlify/functions/addPlayer', {
    method: 'POST',
    body: JSON.stringify({ password, name, roblox_id })
  });

  if (res.ok) {
    alert('Added successfully!');
    location.reload(); // Refresh to show new player
  } else {
    alert('Failed: Check your password.');
  }
};
