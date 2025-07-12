// script.js

const players = [
  { name: "Ninjadhs1", id: 654733209 },
  { name: "supero1432", id: 1231805530 },
  { name: "REYHULKPRO9", id: 1496833668 },
  { name: "drxftvamp", id: 1165250803 },
  { name: "Khenxus", id: 1272545967 },
  { name: "XiDuxrentusxX", id: 3654730712 },
  { name: "lefblox_666", id: 1528223828 },
  { name: "im_kashinn", id: 5341059980 },
  { name: "yeah3415", id: 2013541072 },
  { name: "y3rr9", id: 1489214711 },
  { name: "gareyco_107", id: 1022492466 },
  { name: "jeanxsnn", id: 768301086 },
  { name: "xxgran722xx", id: 1818441922 },
  { name: "Progam3rlons", id: 2546465432 },
  { name: "lasardina4328sardina", id: 1322652918 },
  { name: "AitaOnTop", id: 4628543491 },
  { name: "BlessedSacramentt", id: 5321240257 },
  { name: "Bxk7x6", id: 5395353736 },
  { name: "gareyco_1O7", id: 4407827196 },
  { name: "germaprogamer22", id: 2237407693 },
  { name: "XlDuxrentusxX", id: 4010247893 },
  { name: "arledis_demente", id: 1225837960 },
  { name: "kevin_roblox323", id: 538433129 },
  { name: "lequl841", id: 3275144930 },
  { name: "NocturnalDisorder", id: 3252661184 },
  { name: "NobodyIsAware", id: 3547441589 },
  { name: "DxrknessShadowss", id: 735394702 },
  { name: "BlessedSacred", id: 3859780537 },
  { name: "bxrxlot", id: 12256369 },
  { name: "Aicetis", id: 1229672957 },
  { name: "Dogboyshvy", id: 4228365997 },
  { name: "GetGian", id: 2331484141 },
  { name: "DartherShadowss", id: 3851759664 },
  { name: "McBryan136", id: 1296199736 },
  { name: "KingOfTheHellxO", id: 4266728936 },
  { name: "Bludoverdxrk", id: 3373871256 },
  { name: "GixnkyDelmxnunt", id: 4437701277 },
  { name: "DaxwerSekkmotss", id: 3771135418 },
  { name: "vKrxmpus", id: 4179840177 },
  { name: "DawxerSekhmotss", id: 7451079550 },
  { name: "iiShaxxkz", id: 5852447025 },
  { name: "mmkyedcr", id: 490814342 },
  { name: "NothingToRemind", id: 3694688783 },
  { name: "1qALATORRE", id: 1397707621 },
  { name: "JESUS_ALATORRE17", id: 7662297431 },
  { name: "JESUS_ALATORREE2OO7", id: 7658664037 },
  { name: "JESUS_ALAT0RRE2006", id: 4674599896 },
  { name: "Deepsnakerequest", id: 7617279913 },
  { name: "HOKXXEASON", id: 4774480698 },
  { name: "D4ARKLIFEREAL", id: 1937570720 },
  { name: "1xBozz", id: 5687168229 },
  { name: "drxftbud", id: 7451122485 },
  { name: "xlTayler90k", id: 948717806 },
  { name: "M3NTELOK4", id: 1613189299 },
  { name: "maricielo20060", id: 1449681167 },
  { name: "elgordais", id: 2275606575 },
  { name: "Dahunius", id: 3956858721 },
  { name: "bompii1", id: 7182042886 },
  { name: "ElDiegoOficial2010", id: 3115676240 },
  { name: "you235712", id: 2400090131 },
  { name: "manucraftero132", id: 1584587001 },
  { name: "Xxgran722X", id: 6015219503 },
  { name: "xsircz", id: 2936712226 },
  { name: "rnxx1s", id: 7418861832 },
  { name: "alberthj666", id: 2692945673 },
  { name: "DIEGO25PLAY", id: 1509731235 },
  { name: "davicho54", id: 289634129 },
  { name: "germprogamer22", id: 7451546489 },
  { name: "clearlyc0dy_0mg", id: 4786769442 },
  { name: "j4m4l1fe", id: 1005735583 },
  { name: "alsil", id: 160216019 },
  { name: "ericktttttyyy", id: 4808155603 },
  { name: "entendree", id: 176683308 },
  { name: "chonsarro1", id: 921567634 },
  { name: "elcraca273", id: 1446591728 },
  { name: "juanranciado", id: 4230649998 },
  { name: "xBlood_s0uls", id: 2301586592 },
  { name: "xBIoodLord", id: 1548524890 },
  { name: "H3LLCR3STT", id: 5499277636 },
  { name: "SoulMercy", id: 348750127 },
  { name: "Logans266", id: 1310621055 },
  { name: "GexGore", id: 4255779387 },
  { name: "ESP4C10", id: 4413217813 },
  { name: "Andrew19_29", id: 1860874824 },
  { name: "zMr_Potato", id: 1674928150 },
  { name: "IxsDev", id: 1342114927 },
  { name: "Oscxrxxz", id: 5109308571 },
  { name: "Esteba5378", id: 1693365751 },
  { name: "TehMiq_Alt", id: 5341162058 }
];

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  if (!grid) return;

  // Notification element (create once)
 // Toast container at bottom center
const toastContainer = document.createElement("div");
toastContainer.id = "toast-container";
toastContainer.style.position = "fixed";
toastContainer.style.bottom = "30px";
toastContainer.style.left = "50%";
toastContainer.style.transform = "translateX(-50%)";
toastContainer.style.display = "flex";
toastContainer.style.flexDirection = "column-reverse";
toastContainer.style.gap = "10px";
toastContainer.style.zIndex = "9999";
document.body.appendChild(toastContainer);

function showNotification(text) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = `📋 ${text}`;

  // Style the individual toast
  Object.assign(toast.style, {
    background: "rgba(20, 20, 20, 0.95)",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #3f3f3f",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    fontSize: "0.9rem",
    fontWeight: "500",
    opacity: "0",
    transform: "scale(0.95)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    pointerEvents: "none",
  });

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "scale(1)";
  });

  // Auto-remove after 1.6s with fade-out
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "scale(0.95)";
    setTimeout(() => {
      toast.remove();
    }, 300); // match transition duration
  }, 1600);
}



  // Step 1: Render cards with placeholders
  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-user-id", player.id);

    // Click to copy user ID
    card.addEventListener("click", () => {
      navigator.clipboard.writeText(player.id.toString()).then(() => {
        showNotification(`UserID ${player.id} copied to clipboard`);
      }).catch(err => {
        console.error("Failed to copy:", err);
        showNotification("Failed to copy");
      });
    });

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
      const res = await fetch(`/.netlify/functions/avatars?userIds=${userIds}`);
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
