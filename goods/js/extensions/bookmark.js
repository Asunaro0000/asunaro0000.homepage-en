// Bookmark triple-banner (3 images per set)
(function () {
  const img1 = document.getElementById("bmImage1");
  const img2 = document.getElementById("bmImage2");
  const img3 = document.getElementById("bmImage3");
  const captionEl = document.getElementById("bookmarkCaption");
  const linkEl    = document.getElementById("bookmarkLink");
  const dotsBox   = document.getElementById("bookmarkDots");

  if (!img1 || !img2 || !img3 || !captionEl || !linkEl || !dotsBox) return;

  // ★ ここを後で差し替えればOK
  const sets = [
    {
      images: [
        "./assets/bookmarks/set1_1.webp",
        "./assets/bookmarks/set1_2.webp",
        "./assets/bookmarks/set1_3.webp",
      ],
      caption: "A bookmark set with quiet colors that capture the forest and winter atmosphere.",
      href: "https://asunaro0000.booth.pm/items/7743487",         // 実際のBOOTH URLに差し替え
      btnLabel: "▶ View Set B"
    },
    {
      images: [
        "./assets/bookmarks/set2_2.webp",
        "./assets/bookmarks/set2_2.webp",
        "./assets/bookmarks/set2_2.webp",
      ],
      caption: "This is the backside design of the bookmark.",
      href: "https://asunaro0000.booth.pm/items/7743487",
      btnLabel: "▶ View Set A"

    },

  ];

  let index = 0;
  const INTERVAL_MS = 5000;
  let timer = null;

  // ドット生成
  const dots = sets.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "top-banner__dot";
    dot.setAttribute("aria-label", `Bookmark set ${i + 1}`);
    dot.addEventListener("click", () => {
      index = i;
      showSet(index, true);
      resetTimer();
    });
    dotsBox.appendChild(dot);
    return dot;
  });

  function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
      if (i === activeIndex) dot.classList.add("is-active");
      else dot.classList.remove("is-active");
    });
  }

  function applyImages(imgEls, sources, immediate) {
    const [el1, el2, el3] = imgEls;

    // フェードアウト
    [el1, el2, el3].forEach(el => el.classList.add("is-fading"));
    captionEl.style.opacity = 0;
    linkEl.style.opacity = 0;

    const delay = immediate ? 0 : 250;

    setTimeout(() => {
      el1.src = sources[0];
      el2.src = sources[1];
      el3.src = sources[2];

      // フェードイン
      requestAnimationFrame(() => {
        [el1, el2, el3].forEach(el => el.classList.remove("is-fading"));
        captionEl.style.opacity = 1;
        linkEl.style.opacity = 1;
      });
    }, delay);
  }

  function showSet(i, immediate) {
    const set = sets[i];
    if (!set) return;

    applyImages([img1, img2, img3], set.images, immediate);

    captionEl.textContent = set.caption;
    linkEl.href = set.href;
    linkEl.textContent = set.btnLabel;

    updateDots(i);
  }

  function nextSet() {
    index = (index + 1) % sets.length;
    showSet(index, false);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSet, INTERVAL_MS);
  }

  function resetTimer() {
    startTimer();
  }

  // 初期表示
  showSet(index, true);
  startTimer();
})();
