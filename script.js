// script.js

// 1. Initial configuration
const SUPABASE_URL = 'https://wfmojulwehfudlmqehgg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbW9qdWx3ZWhmdWRsbXFlaGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1OTIsImV4cCI6MjA5NjAxNzU5Mn0.W-lQKy8_R0ygkiJTBhZd03bMkfJW6g0YJ4ELdpLMX-Y';

// 2. Logic to fetch players from Supabase and render the grid
async function loadPlayers() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });
    const players = await response.json();
    renderAvatarGrid(players);
  } catch (err) {
    console.error("Failed to load players:", err);
  }
}

// 3. Simple render function (adjust this to match your existing HTML structure)
function renderAvatarGrid(players) {
  const grid = document.getElementById('avatarGrid');
  grid.innerHTML = ''; // Clear existing
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

// 4. Ctrl + Q to toggle the Modal
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'q') {
    const modal = document.getElementById('adminModal');
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
  }
});

// 5. Function to add a new player via your Netlify function
async function addPlayer() {
  const password = document.getElementById('passInput').value;
  const name = document.getElementById('nameInput').value;
  const roblox_id = document.getElementById('idInput').value;

  const res = await fetch('/.netlify/functions/addPlayer', {
    method: 'POST',
    body: JSON.stringify({ password, name, roblox_id })
  });

  if (res.ok) {
    alert('Added successfully! Refresh the page to see the new avatar.');
  } else {
    alert('Failed: Check your password.');
  }
}

// Run on load
loadPlayers();
