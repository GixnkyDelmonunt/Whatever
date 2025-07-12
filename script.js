// script.js

const players = [
  { name: "Ninjadhs1", id: 654733209 },
  { name: "supero1432", id: 1231805530 },
  { name: "REYHULKPRO9", id: 1496833668 },
  // Add more players here
];

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  if (!grid) return;

  // Step 1: Render cards with placeholders
  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "avatar-card";

    const img = document.createElement("img");
    img.className = "avatar-img";
    img.src = "https://via.placeholder.com/420x420?text=Loading";
    img.alt = "Loading avatar";
    img.setAttribute("data-user-id", player.id); // for later use

    const name = document.createElement("div");
    name.className = "avatar-name";
    name.textContent = player.name;

    card.appendChild(img);
    card.appendChild(name);
    grid.appendChild(card);
  });

  // Step 2: Fetch avatars in chunks
  const chunkSize = 50;
  for (let i = 0; i < players.length; i += chunkSize) {
    const chunk = players.slice(i, i + chunkSize);
    const userIds = chunk.map(p => p.id).join(",");

    try {
      const res = await fetch(
        `/.netlify/functions/avatars?userIds=${userIds}`
      );
      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data = await res.json();

      // Step 3: Set avatar images
      data.data.forEach((avatar) => {
        const img = document.querySelector(`img[data-user-id="${avatar.targetId}"]`);
        if (img) {
          img.crossOrigin = "anonymous";
          img.src = avatar.imageUrl || "https://via.placeholder.com/420x420?text=No+Avatar";
          img.alt = avatar.imageUrl ? "" : "No avatar";
          img.onerror = () => {
            console.warn("Image failed to load:", avatar.imageUrl);
            img.src = "https://via.placeholder.com/420x420?text=Failed";
            img.alt = "Avatar failed to load";
          };
        }
      });

      // Step 4: Log any that weren't returned
      chunk.forEach((player) => {
        const found = data.data.find(d => d.targetId === player.id);
        if (!found) {
          console.warn("Missing avatar for:", player.name, `(ID: ${player.id})`);
        }
      });

    } catch (err) {
      console.error("Failed to fetch avatars:", err);
      document.querySelectorAll(".avatar-img").forEach(img => {
        img.src = "https://via.placeholder.com/420x420?text=Error";
        img.alt = "Error loading avatar";
      });
    }
  }
});
