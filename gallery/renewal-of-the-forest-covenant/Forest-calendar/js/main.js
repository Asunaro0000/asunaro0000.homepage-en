// 画像のベースパスと拡張子（webpでテスト）
const IMAGE_ROOT = "./assets/images/forest-room";
const IMAGE_EXT = ".webp";

// JSの曜日: 0=日,1=月,2=火,3=水,4=木,5=金,6=土
// 各曜日のフォルダ名・ラベル・背景色・文字色
// JSの曜日: 0=日,1=月,2=火,3=水,4=木,5=金,6=土
// 各曜日のフォルダ名・ラベル・背景色(またはグラデ)・文字色
const DAY_INFO = {
  0: {
    folder: "sun",
    label: "日曜日",
    // 虹色グラデーション
    bgColor: "#F6F1DA",
    textColor: "#292313"
  },
  1: {
    folder: "mon",
    label: "月曜日",
    // 銀（シルバー系）
    bgColor: "#C8CCD5",
    textColor: "#20232A"
  },
  2: {
    folder: "tue",
    label: "火曜日",
    // ここは前のままでもOK（炎アンバー系）
    bgColor: "#4A2A1A",
    textColor: "#F2C87B"
  },
  3: {
    folder: "wed",
    label: "水曜日",
    // ここも前のまま（インディゴ）
    bgColor: "#1A2336",
    textColor: "#E1E5F0"
  },
  4: {
    folder: "thu",
    label: "木曜日",
    // 緑
    bgColor: "#355C3D",
    textColor: "#E9F3E8"
  },
  5: {
    folder: "fri",
    label: "金曜日",
    // 黄色系（眩しすぎない柔らかい黄）
    bgColor: "#F5D76E",
    textColor: "#3A3210"
  },
  6: {
    folder: "sat",
    label: "土曜日",
    // ブラウン
    bgColor: "#5A3A24",
    textColor: "#F3E1CF"
  }
};

function applyDayTheme(info) {
  const root = document.documentElement;

  // グラデーション優先
  if (info.bgGradient) {
    root.style.setProperty("--bg-color", "transparent"); // 予備
    document.body.style.background = info.bgGradient;
  } else if (info.bgColor) {
    document.body.style.background = info.bgColor;
    root.style.setProperty("--bg-color", info.bgColor);
  }

  root.style.setProperty("--text-color", info.textColor);
}


// 各曜日フォルダの枚数（01～n）
// 必要枚数に合わせて数字を変える
const IMAGE_COUNTS = {
  mon: 13,
  tue: 13,
  wed: 13,
  thu: 13,
  fri: 13,
  sat: 13,
  sun: 13
};

let currentDayIndex = new Date().getDay(); // デフォルトは実際の曜日

// ライトボックス用
let lightboxEl = null;
let lightboxImg = null;

function pad2(num) {
  return num.toString().padStart(2, "0");
}

function applyDayTheme(info) {
  const root = document.documentElement;
  root.style.setProperty("--bg-color", info.bgColor);
  root.style.setProperty("--text-color", info.textColor);
}

function buildRoom(dayIndex) {
  const info = DAY_INFO[dayIndex];
  if (!info) return;

  applyDayTheme(info);

  const folder = info.folder;
  const count = IMAGE_COUNTS[folder] || 0;

  const grid = document.getElementById("grid-rows");
  const note = document.getElementById("room-note");



  // 01,02 が1行目／03,04 が2行目…という構成
  for (let i = 1; i <= count; i += 2) {
    const isLastOdd = i + 1 > count;

    // 行コンテナ
    const row = document.createElement("div");

    // 最後が奇数で1枚だけの行 → フル幅表示
    if (isLastOdd) {
      row.className = "grid-row single-row";

      const fullCell = document.createElement("div");
      fullCell.className = "grid-cell full-width";

      const fullImg = document.createElement("img");
      fullImg.src =
        IMAGE_ROOT + "/" + folder + "/" + pad2(i) + IMAGE_EXT;
      fullImg.alt = folder + " " + pad2(i);

      fullCell.appendChild(fullImg);
      row.appendChild(fullCell);
      grid.appendChild(row);
      break;
    }

    // 通常行（左右2枚）
    row.className = "grid-row";

    // 左（奇数）
    const leftCell = document.createElement("div");
    leftCell.className = "grid-cell";
    const leftImg = document.createElement("img");
    leftImg.src =
      IMAGE_ROOT + "/" + folder + "/" + pad2(i) + IMAGE_EXT;
    leftImg.alt = folder + " " + pad2(i);
    leftCell.appendChild(leftImg);

    // 右（偶数）
    const rightCell = document.createElement("div");
    rightCell.className = "grid-cell";
    const rightImg = document.createElement("img");
    rightImg.src =
      IMAGE_ROOT + "/" + folder + "/" + pad2(i + 1) + IMAGE_EXT;
    rightImg.alt = folder + " " + pad2(i + 1);
    rightCell.appendChild(rightImg);

    row.appendChild(leftCell);
    row.appendChild(rightCell);

    grid.appendChild(row);
  }

  // デバッグボタンのハイライト更新
  updateDebugButtons(dayIndex);
}

// デバッグボタンの見た目更新
function updateDebugButtons(dayIndex) {
  const btns = document.querySelectorAll(".day-btn");
  btns.forEach((btn) => {
    const d = Number(btn.dataset.day);
    if (d === dayIndex) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });
}

// デバッグボタンのクリック設定
function setupDebugButtons() {
  const btns = document.querySelectorAll(".day-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const d = Number(btn.dataset.day);
      currentDayIndex = d;
      buildRoom(currentDayIndex);
    });
  });
}

// ライトボックスのセットアップ
function setupLightbox() {
  lightboxEl = document.getElementById("lightbox");
  lightboxImg = document.getElementById("lightboxImage");

  if (!lightboxEl || !lightboxImg) return;

  // ギャラリー内の画像クリックでライトボックス表示（イベント委譲）
  const grid = document.getElementById("grid-rows");
  grid.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.tagName === "IMG") {
      openLightbox(target.src);
    }
  });

  // ライトボックス自体をクリックで閉じる
  lightboxEl.addEventListener("click", () => {
    closeLightbox();
  });
}

function openLightbox(src) {
  if (!lightboxEl || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxEl.classList.add("is-open");
  lightboxEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // 背景スクロール止める
}

function closeLightbox() {
  if (!lightboxEl || !lightboxImg) return;
  lightboxEl.classList.remove("is-open");
  lightboxEl.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  setupDebugButtons();
  setupLightbox();
  buildRoom(currentDayIndex);
});
