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
  { name: "daxwerDelmonunt", id: 1371366812 },
  { name: "9kdeadsouls", id: 1690242112 },
  { name: "KungFuPandaKrew", id: 7531100443 },
  { name: "0nixis", id: 1177615098 },
  { name: "rankrko", id: 8733019128 },
  { name: "y3rr9", id: 1489214711 },
  { name: "Alxxzz1", id: 8364173166 },
  { name: "klaser22", id: 272027870 },
  { name: "gareyco_107", id: 1022492466 },
  { name: "jeanxsnn", id: 768301086 },
  { name: "xxgran722xx", id: 1818441922 },
  { name: "Triippyzz", id: 138219381 },
  { name: "Ovlle", id: 2253595195 },
  { name: "dxrftblud", id: 7877661694 },
  { name: "Progam3rlons", id: 2546465432 },
  { name: "Progam3rlons", id: 2546465432 },
  { name: "lasardina4328sardina", id: 1322652918 },
  { name: "ibx18k", id: 5549459192 },
  { name: "Yarapowerr", id: 189720070 },
  { name: "AitaOnTop", id: 4628543491 },
  { name: "dsadadad804", id: 5605162072 },
  { name: "Iac3ys", id: 375935386 },
  { name: "BlessedSacramentt", id: 5321240257 },
  { name: "07suspect", id: 1139927044 },
  { name: "Bxk7x6", id: 5395353736 },
  { name: "gareyco_1O7", id: 4407827196 },
  { name: "germaprogamer22", id: 2237407693 },
  { name: "XlDuxrentusxX", id: 4010247893 },
  { name: "arledis_demente", id: 1225837960 },
  { name: "Dxrkners", id: 4593790536 },
  { name: "kevin_roblox323", id: 538433129 },
  { name: "Not_MossedYT", id: 1965757720 },
  { name: "lequl841", id: 3275144930 },
  { name: "abrahamak_477", id: 2208207168 },
  { name: "NocturnalDisorder", id: 3252661184 },
  { name: "NobodyIsAware", id: 3547441589 },
  { name: "letmepumpp", id: 735394702 },
  { name: "andresceva111", id: 982314062 },
  { name: "BlessedSacred", id: 3859780537 },
  { name: "bxrxlot", id: 12256369 },
  { name: "Aicetis", id: 1229672957 },
  { name: "crater15101", id: 1814557802 },
  { name: "Dogboyshvy", id: 4228365997 },
  { name: "GetGian", id: 2331484141 },
  { name: "MaxwellSekkmotss", id: 4748841426 },
  { name: "DartherShadowss", id: 3851759664 },
  { name: "Rxbonn", id: 7248042606 },
  { name: "McBryan136", id: 1296199736 },
  { name: "JonnyLawraceSensei", id: 1906882872 },
  { name: "SyntxxWcu", id: 4484725234 },
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
  { name: "evreynt", id: 1726375474 },
  { name: "manucraftero132", id: 1584587001 },
  { name: "slazed", id: 64705290 },
  { name: "Xxgran722X", id: 6015219503 },
  { name: "xsircz", id: 2936712226 },
  { name: "rnxx1s", id: 7418861832 },
  { name: "akinclears", id: 2888051148 },
  { name: "alberthj666", id: 2692945673 },
  { name: "DIEGO25PLAY", id: 1509731235 },
  { name: "davicho54", id: 289634129 },
  { name: "germprogamer22", id: 7451546489 },
  { name: "clearlyc0dy_0mg", id: 4786769442 },
  { name: "masterindiarocks", id: 360576345 },
  { name: "j4m4l1fe", id: 1005735583 },
  { name: "alsil", id: 160216019 },
  { name: "Emperize", id: 161678574 },
  { name: "ericktttttyyy", id: 4808155603 },
  { name: "entendree", id: 176683308 },
  { name: "chonsarro1", id: 921567634 },
  { name: "3k_waves", id: 2597959519 },
  { name: "elcraca273", id: 1446591728 },
  { name: "juanranciado", id: 4230649998 },
  { name: "xXxEfeTheKingxXx", id: 863090273 },
  { name: "xBlood_s0uls", id: 2301586592 },
  { name: "xBIoodLord", id: 1548524890 },
  { name: "H3LLCR3STT", id: 5499277636 },
  { name: "SoulMercy", id: 348750127 },
  { name: "Logans266", id: 1310621055 },
  { name: "GexGore", id: 4255779387 },
  { name: "ESP4C10", id: 4413217813 },
  { name: "Get_Mined/enoblog", id: 3725891679 },
  { name: "Andrew19_29", id: 1860874824 },
  { name: "zMr_Potato", id: 1674928150 },
  { name: "IxsDev", id: 1342114927 },
  { name: "Oscxrxxz", id: 5109308571 },
  { name: "Esteba5378", id: 1693365751 },
  { name: "UN55029572", id: 409772658 },
  { name: "SombreFeelings", id: 310085956 },
  { name: "T4RGA", id: 338436976 },
  { name: "TehMiq_Alt", id: 5341162058 }
];

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("avatarGrid");
  const searchInput = document.getElementById("searchInput");
  if (!grid || !searchInput) return;

  // Toast notification container
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
  toastContainer.style.pointerEvents = "none";
  document.body.appendChild(toastContainer);

  function showNotification(text) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = `${text}`;

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
      transition: "opacity 0.3s ease, transform 0.3s ease, margin 0.3s ease",
      marginBottom: "0px",
      pointerEvents: "auto",
    });

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "scale(1)";
      toast.style.marginBottom = "0px";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "scale(0.95)";
      toast.style.marginBottom = "-20px";
      setTimeout(() => toast.remove(), 300);
    }, 1600);
  }

  // Step 1: Render cards with placeholders
  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "avatar-card";
    card.setAttribute("data-user-id", player.id);
    card.setAttribute("data-username", player.name.toLowerCase());

    card.addEventListener("click", () => {
      navigator.clipboard.writeText(player.id.toString()).then(() => {
        showNotification(`UserID ${player.id} copied to clipboard.`);
      }).catch(err => {
        console.error("Failed to copy:", err);
        showNotification("Failed to copy");
      });
    });

    const img = document.createElement("img");
    img.className = "avatar-img";
    img.src = "https://via.placeholder.com/420x420?text=Loading";
    img.alt = "Loading avatar";
    img.setAttribute("data-user-id", player.id);

    const name = document.createElement("div");
    name.className = "avatar-name";
    name.textContent = player.name;

    card.appendChild(img);
    card.appendChild(name);
    grid.appendChild(card);
  });

  // Step 2: Search filtering (username only)
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    Array.from(grid.children).forEach((card) => {
      const username = card.getAttribute("data-username");
      card.style.display = username.includes(query) ? "" : "none";
    });
  });

  // Step 3: Fetch avatars in chunks
  const chunkSize = 50;
  for (let i = 0; i < players.length; i += chunkSize) {
    const chunk = players.slice(i, i + chunkSize);
    const userIds = chunk.map(p => p.id).join(",");

    try {
      const res = await fetch(`/.netlify/functions/avatars?userIds=${userIds}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data = await res.json();

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

