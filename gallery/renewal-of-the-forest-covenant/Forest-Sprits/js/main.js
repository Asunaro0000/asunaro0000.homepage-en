// =====================================
// 1. 背景の森スクロール（PC / スマホで速度分岐）
// =====================================
(() => {
  const bg = document.querySelector(".forest-bg");
  if (!bg) return;

  const images = [
    "assets/images/bg-forest1.webp",
    "assets/images/bg-forest2.webp",
    "assets/images/bg-forest3.webp",
    // 必要ならここに追加
  ];

  let index = 0;
  let posY = 100;

  // PC（768px以上）: ゆっくり、スマホ: やや速く
  const isMobile = window.innerWidth < 768;
  const SPEED = isMobile ? 0.1 : 0.02;

  function setImage(i) {
    bg.style.backgroundImage = `url("${images[i]}")`;
    posY = 100;
    bg.style.backgroundPosition = `center ${posY}%`;
  }

  setImage(index);

  function animate() {
    posY -= SPEED;
    bg.style.backgroundPosition = `center ${posY}%`;

    if (posY <= 0) {
      index++;
      if (index >= images.length) index = 0;
      setImage(index);
    }

    requestAnimationFrame(animate);
  }

  animate();
})();


// =====================================
// 2. ギャラリーカード定義（プレイリスト管理）
// =====================================
const galleryItems = [
  {
    src: "assets/images/1.webp",
    alt: "A girl reading in the autumn forest with an owl nearby",
    caption: "Pages breathe softly between the rustling wind."
  },

  {
    src: "assets/images/2.webp",
    alt: "A girl illuminated by moonlight and drifting autumn glow",
    caption: "The filling light gently warms the quiet space within."
  },
  {
    src: "assets/images/3.webp",
    alt: "A girl receiving light in her hands beneath the autumn sky",
    caption: "A flicker of light begins to outline the world."
  },

  {
    src: "assets/images/4.webp",
    alt: "A girl sitting on a stump embraced by forest spirits",
    caption: "A calm breath shimmers blue in the forest depths."
  },

  {
    src: "assets/images/5.webp",
    alt: "A girl sharing nuts with small companions under soft sunlight",
    caption: "A warm scent gathers small circles of life together."
  },

  {
    src: "assets/images/6.webp",
    alt: "A girl resting beneath a large leaf",
    caption: "Listening to the sparkle of dew, she drifts through the sea of leaves."
  },
  {
    src: "assets/images/7.webp",
    alt: "A girl receiving the wind atop a branch, with spirits by her side",
    caption: "Wrapped in wind, the blue flame leans in with a smile."
  },
  {
    src: "assets/images/8.webp",
    alt: "A girl with rainbow-colored wings and forest spirits",
    caption: "Wings of light illuminate the forest as blue voices rise."
  },
  {
    src: "assets/images/9.webp",
    alt: "A girl in blue standing quietly with a great owl",
    caption: "A calm gaze signals the forest to deepen its presence."
  },
  {
    src: "assets/images/10.webp",
    alt: "A girl holding a lotus lantern while walking through a flower field",
    caption: "Gathering light in the flower breeze, she releases a gentle prayer."
  },

  {
    src: "assets/images/11.webp",
    alt: "A girl sleeping within a bed of flowers",
    caption: "Wrapped in floral breath, only dreams softly swayed."
  },
  {
    src: "assets/images/12.webp",
    alt: "Rabbit-eared shrine maidens at a morning sanctuary",
    caption: "Small footsteps gather at the dawn shrine as the forest awakens."
  },
  {
    src: "assets/images/13.webp",
    alt: "A girl resting under birch trees with spirits and a great serpent",
    caption: "In the birch shadows, the old guardians draw near."
  },
  {
    src: "assets/images/14.webp",
    alt: "A shrine maiden wearing a deer mask",
    caption: "A quiet presence stirs behind the mask as leaf-whispers gently bind the air."
  },
  {
    src: "assets/images/15.webp",
    alt: "A green-clad shrine maiden walking with forest spirits",
    caption: "Clad in green breath, blue shadows sway in harmony."
  },

  {
    src: "assets/images/16.webp",
    alt: "A fox-eared girl holding blue fire atop a shrine roof",
    caption: "The flame of prayer flickers in tranquil silence."
  },
  {
    src: "assets/images/17.webp",
    alt: "A girl gazing at foxfire beneath hanging bells",
    caption: "A summoned presence sends a tremble through her chest."
  },
  {
    src: "assets/images/18.webp",
    alt: "A fox-eared girl turning back with floating blue foxfire",
    caption: "The wind opens the door, revealing the path ahead."
  },
  {
    src: "assets/images/19.webp",
    alt: "A small masked being sitting on a great tree branch",
    caption: "The forest's quiet eyes keep watch from above."
  },
  {
    src: "assets/images/20.webp",
    alt: "Green light dwelling in a tree trunk with many carved windows",
    caption: "Deep within the trunk, ancient memories sleep."
  },

  {
    src: "assets/images/21.webp",
    alt: "A green-haired girl facing a small black creature on a branch",
    caption: "A shadowed voice rustles the leaves around them."
  },
  {
    src: "assets/images/22.webp",
    alt: "White and black stag spirits standing side by side",
    caption: "The forest’s rulers appear in silent dignity."
  },
  {
    src: "assets/images/23.webp",
    alt: "A small white creature leaping through the forest wrapped in flame",
    caption: "A single trail of fire lights the darkness."
  },
  {
    src: "assets/images/24.webp",
    alt: "A girl standing on the water’s surface, watching a blue fish spirit approach",
    caption: "Beyond the rippling rings, a voice quietly calls."
  },

  // Add more items here
];



// =====================================
// 3. ギャラリーDOM生成
// =====================================
function renderGallery() {
  const grid = document.getElementById("fg-grid");
  if (!grid) return;

  grid.innerHTML = "";

  galleryItems.forEach((item) => {
    const link = document.createElement("a");
    link.className = "fg-card";
    link.href = "#";

    const fig = document.createElement("figure");
    fig.className = "fg-figure";

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "";
    img.loading = "lazy";

    const cap = document.createElement("figcaption");
    cap.className = "fg-caption";
    cap.textContent = item.caption || "";

    fig.appendChild(img);
    fig.appendChild(cap);
    link.appendChild(fig);
    grid.appendChild(link);
  });
}


// =====================================
// 4. ライトボックス初期化
// =====================================
function setupLightbox() {
  const cards = document.querySelectorAll(".fg-card");
  const lightbox = document.getElementById("fg-lightbox");
  const imgEl = document.getElementById("fg-lightbox-img");
  const capEl = document.getElementById("fg-lightbox-caption");
  const closeBtn = document.querySelector(".fg-lightbox-close");

  if (!cards.length || !lightbox || !imgEl || !capEl) return;

  function openLightbox(src, alt, caption) {
    imgEl.src = src;
    imgEl.alt = alt || "";
    capEl.textContent = caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    imgEl.src = "";
    imgEl.alt = "";
    capEl.textContent = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const img = card.querySelector("img");
      const cap = card.querySelector(".fg-caption");
      if (!img) return;
      openLightbox(img.src, img.alt, cap ? cap.textContent : "");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}


// =====================================
// 5. DOM構築後にギャラリーとライトボックスを準備
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  setupLightbox();
});
