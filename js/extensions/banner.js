// 自動切り替えバナー（スライド＋ドットインジケーター付き）
(function () {
  const bannerImage   = document.getElementById("bannerImage");
  const bannerCaption = document.getElementById("bannerCaption");
  const bannerLink    = document.getElementById("bannerLink");
  const bannerDotsBox = document.getElementById("bannerDots");

  if (!bannerImage || !bannerCaption || !bannerLink || !bannerDotsBox) return;

  // ★ ここを差し替えれば内容を自由に増減できる
const banners = [
  {
    src: "./assets/banner/banner7.webp",
    caption: "Visit the Forest Archive Room: Forest Activity.",
    href: "./gallery/renewal-of-the-forest-covenant/Forest-panorama-background/index.html",
    btnLabel: "▶ Go to Forest Activity"
  },
  {
    src: "./assets/banner/banner6.webp",
    caption: "Explore the Forest Spirit Gallery.",
    href: "./gallery/renewal-of-the-forest-covenant/Forest-Sprits/index.html",
    btnLabel: "▶ Open Forest Spirit Gallery"
  },
  {
    src: "./assets/banner/banner5.webp",
    caption: "The Halloween Panorama Gallery is now open.",
    href: "./gallery/lili_and_kaede/halloween_single/index.html",
    btnLabel: "▶ View Halloween Panorama"
  },
  {
    src: "./assets/banner/banner4.webp",
    caption: "Enter Risuko's Panorama Gallery.",
    href: "./gallery/Risko/risuko_room/index.html",
    btnLabel: "▶ View Risuko's Panorama"
  },
  {
    src: "./assets/banner/banner3.webp",
    caption: "The background art room of Shiori no Mori is now open.",
    href: "./gallery/renewal-of-the-forest-covenant/Forest_of_Story_Marks/index.html",
    btnLabel: "▶ Open Shiori no Mori Room"
  },
  {
    src: "./assets/banner/banner2.webp",
    caption: "Kameko's daily-life gallery has been released.",
    href: "./gallery/Usako_and_Kameko/kameko_diary/index.html",
    btnLabel: "▶ Visit Kameko's Daily Life"
  },
  {
    src: "./assets/banner/banner1.webp",
    caption: "Usako's daily-life gallery has been released.",
    href: "./gallery/Usako_and_Kameko/usako_diary/index.html",
    btnLabel: "▶ Visit Usako's Daily Life"
  },
];


  let index = 0;
  const INTERVAL_MS = 4000; // 4秒ごとに切り替え
  let timer = null;

  // ▼ ドットを自動生成
  const dots = banners.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "top-banner__dot";
    dot.setAttribute("aria-label", `バナー ${i + 1}`);
    dot.addEventListener("click", () => {
      index = i;
      showBanner(index, true); // 即座に切り替え
      resetTimer();            // 手動操作後も自動送り継続
    });
    bannerDotsBox.appendChild(dot);
    return dot;
  });

  function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
      if (i === activeIndex) {
        dot.classList.add("is-active");
      } else {
        dot.classList.remove("is-active");
      }
    });
  }

  function showBanner(i, immediate) {
    const item = banners[i];

    // フェードアウト（＋スライドアウト）
    bannerImage.classList.add("is-fading");
    bannerCaption.style.opacity = 0;
    bannerLink.style.opacity = 0;

    const delay = immediate ? 0 : 250;

    setTimeout(() => {
      bannerImage.src = item.src;
      bannerCaption.textContent = item.caption;
      bannerLink.href = item.href;
      bannerLink.textContent = item.btnLabel;

      // フェードイン
      requestAnimationFrame(() => {
        bannerImage.classList.remove("is-fading");
        bannerCaption.style.opacity = 1;
        bannerLink.style.opacity = 1;
      });

      updateDots(i);
    }, delay);
  }

  function nextBanner() {
    index = (index + 1) % banners.length;
    showBanner(index);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextBanner, INTERVAL_MS);
  }

  function resetTimer() {
    startTimer();
  }

  // 最初の表示
  showBanner(index, true);
  updateDots(index);

  // 自動送り開始
  startTimer();
})();
