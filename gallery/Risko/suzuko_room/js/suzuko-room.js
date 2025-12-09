// suzuko-room.js
document.addEventListener("DOMContentLoaded", () => {
  const sceneListEl = document.getElementById("suzuko-scene-list");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.querySelector(".lightbox-close");
  const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
  const btnPrev = document.querySelector(".lightbox-prev");
  const btnNext = document.querySelector(".lightbox-next");

  if (!sceneListEl || !lightbox || !lightboxImg || !lightboxCaption || !btnPrev || !btnNext) return;

  // ===== スズ子のシーン定義（サムネ n-0.webp ＋ スライダー n-1～n-9.webp） =====
const SUZUKO_SCENES = [
  {
    id: "suzuko-1",
    thumb: "./assets/images/1-0.webp",
    slides: [
      "./assets/images/1-1.webp",
      "./assets/images/1-2.webp",
      "./assets/images/1-3.webp",
      "./assets/images/1-4.webp",
      "./assets/images/1-5.webp",
      "./assets/images/1-6.webp",
      "./assets/images/1-7.webp",
      "./assets/images/1-8.webp"
    ],
    title: "① This is Suzuko.",
    text: [
      "Yep — this is Suzuko.",
      "She’s a super cute white squirrel who comes to the forest and hangs out with us.",
      "Just walking next to her makes me feel like I’m sparkling too."
    ]
  },
  {
    id: "suzuko-2",
    thumb: "./assets/images/2-0.webp",
    slides: [
      "./assets/images/2-1.webp",
      "./assets/images/2-2.webp",
      "./assets/images/2-3.webp",
      "./assets/images/2-4.webp",
      "./assets/images/2-5.webp",
      "./assets/images/2-6.webp",
      "./assets/images/2-7.webp"
    ],
    title: "② Hiking together — she looks like a fairy in the sunlight.",
    text: [
      "Today we went on a snowy mountain hike together.",
      "When the sunlight hits her tail, the patterns catch the light and she seriously looks like a fairy.",
      "At this point it’s not “fairy-like” — it’s basically the real thing, right?"
    ]
  },
  {
    id: "suzuko-3",
    thumb: "./assets/images/3-0.webp",
    slides: [
      "./assets/images/3-1.webp",
      "./assets/images/3-2.webp",
      "./assets/images/3-3.webp",
      "./assets/images/3-4.webp",
      "./assets/images/3-5.webp",
      "./assets/images/3-6.webp",
      "./assets/images/3-7.webp",
      "./assets/images/3-8.webp"
    ],
    title: "③ Reading books together at Suzuko’s home.",
    text: [
      "This is Suzuko’s house.",
      "Her bookshelf is filled with books about stars and the moon — I was honestly impressed.",
      "Every time we turned a page, the snow outside shimmered a little… I swear that has to be her magic.",
      "The fireplace was so warm that I never wanted to leave."
    ]
  },
  {
    id: "suzuko-4",
    thumb: "./assets/images/4-0.webp",
    slides: [
      "./assets/images/4-1.webp",
      "./assets/images/4-2.webp",
      "./assets/images/4-3.webp",
      "./assets/images/4-4.webp",
      "./assets/images/4-5.webp",
      "./assets/images/4-6.webp",
      "./assets/images/4-7.webp",
      "./assets/images/4-8.webp",
      "./assets/images/4-9.webp"
    ],
    title: "④ Stargazing together.",
    text: [
      "At night, we went out to see the stars.",
      "When Suzuko stood in the moonlight, her hair, dress, and even the snowflakes around her looked completely translucent…",
      "A minute ago I was saying “she looks like a fairy,”",
      "but after this view, I think we all agree she IS one."
    ]
  },
  {
    id: "suzuko-5",
    thumb: "./assets/images/5-0.webp",
    slides: [
      "./assets/images/5-0.webp"
    ],
    title: "⑤ Bonus: We made a snowman together.",
    text: [
      "On our way home, we made a snowman together.",
      "Suzuko added a bit of her magic, so its cheeks are glowing just a tiny bit — do you see it?",
      "Her proud little face when we finished… pretty sure that was the cutest moment of the day."
    ]
  }
];


  // ライトボックス用キャプション：今回はカード本文をまとめて使う
  const CAPTIONS = {};
  SUZUKO_SCENES.forEach(scene => {
    CAPTIONS[scene.id] = [scene.title, "", ...scene.text].join("\n");
  });

  // ===== リスト描画（レイアウトは今のまま） =====
  function renderSuzukoScenes() {
    sceneListEl.innerHTML = "";

    SUZUKO_SCENES.forEach(scene => {
      const li = document.createElement("li");
      li.className = "suzuko-scene";

      li.innerHTML = `
        <figure class="suzuko-scene-image">
          <img
            src="${scene.thumb}"
            alt="${scene.title}"
            data-scene-id="${scene.id}"
          >
        </figure>
        <div class="suzuko-scene-text">
          <p class="suzuko-scene-title">${scene.title}</p>
          ${scene.text.map(line => `<p>${line}</p>`).join("")}
        </div>
      `;

      sceneListEl.appendChild(li);
    });
  }

  renderSuzukoScenes();

  // ===== ライトボックス＋スライダー =====
  let currentSceneIndex = 0; // 0〜4
  let currentSlideIndex = 0; // 0〜8

  function updateNavState() {
    const slides = SUZUKO_SCENES[currentSceneIndex].slides;
    const last = slides.length - 1;

    // 先頭で prev 無効
    if (currentSlideIndex === 0) {
      btnPrev.disabled = true;
      btnPrev.classList.add("is-disabled");
    } else {
      btnPrev.disabled = false;
      btnPrev.classList.remove("is-disabled");
    }

    // 最後で next 無効（ループしない）
    if (currentSlideIndex === last) {
      btnNext.disabled = true;
      btnNext.classList.add("is-disabled");
    } else {
      btnNext.disabled = false;
      btnNext.classList.remove("is-disabled");
    }
  }

  function updateLightboxImage() {
    const scene = SUZUKO_SCENES[currentSceneIndex];
    const slides = scene.slides;
    if (!slides || !slides.length) return;

    const src = slides[currentSlideIndex];
    lightboxImg.src = src;
    lightboxImg.alt = `${scene.title} - ${currentSlideIndex + 1}`;
    lightboxCaption.textContent =
      `${CAPTIONS[scene.id]}\n\n(${currentSlideIndex + 1} / ${slides.length})`;

    updateNavState();
  }

  function openLightbox(sceneIndex, slideIndex = 0) {
    currentSceneIndex = sceneIndex;
    currentSlideIndex = slideIndex;
    updateLightboxImage();
    lightbox.classList.remove("hidden");
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightboxCaption.textContent = "";
  }

  // カード内のサムネクリック → そのグループのスライダーを開く
  sceneListEl.addEventListener("click", (e) => {
    const img = e.target.closest("img[data-scene-id]");
    if (!img) return;
    const sceneId = img.dataset.sceneId;
    const idx = SUZUKO_SCENES.findIndex(s => s.id === sceneId);
    if (idx === -1) return;
    openLightbox(idx, 0);
  });

  // 閉じる系
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeLightbox();
    }
  });

  // 前へ
  btnPrev.addEventListener("click", () => {
    if (currentSlideIndex <= 0) return; // 先頭でストップ
    currentSlideIndex -= 1;
    updateLightboxImage();
  });

  // 次へ
  btnNext.addEventListener("click", () => {
    const slides = SUZUKO_SCENES[currentSceneIndex].slides;
    const last = slides.length - 1;
    if (currentSlideIndex >= last) return; // 最後でストップ
    currentSlideIndex += 1;
    updateLightboxImage();
  });

  // 画像クリックで「次へ」（任意・いらなければこのブロック削る）
  lightboxImg.addEventListener("click", () => {
    const slides = SUZUKO_SCENES[currentSceneIndex].slides;
    const last = slides.length - 1;
    if (currentSlideIndex >= last) return;
    currentSlideIndex += 1;
    updateLightboxImage();
  });
});
