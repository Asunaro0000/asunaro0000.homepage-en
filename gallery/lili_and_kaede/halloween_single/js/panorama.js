// js/panorama.js

const pano = document.getElementById("panorama");
const gotoBtn = document.getElementById("panoGotoBtn");
const tabButtons = document.querySelectorAll(".pano-tab");

// ============================
// 各セットの画像リスト
// ============================
// ./images/1-1.webp ～ 1-6.webp みたいな感じを想定。
// count は実際の枚数に合わせて直してください。

const PANO_SETS = {
  1: { prefix: "1-", count: 6 },
  2: { prefix: "2-", count: 15 },
  3: { prefix: "3-", count: 6 }
};

let currentSet = 1;

// ============================
// パノラマ構築（div内の中身だけ差し替え）
// ============================

function buildPanorama(setId) {
  const cfg = PANO_SETS[setId];
  if (!cfg || !pano) return;

  stopAutoScroll();
  deactivateButton();

  currentSet = setId;
  pano.innerHTML = "";

  for (let i = 1; i <= cfg.count; i++) {
    const img = document.createElement("img");
    img.src = `./images/${cfg.prefix}${i}.webp`;
    img.alt = `${cfg.prefix}${i}`;
    img.loading = "lazy";
    pano.appendChild(img);
  }

  pano.scrollLeft = 0;
}

// ============================
// 自動スクロール（リス子と同じ）
// ============================

let autoScroll = false;
let rafId = null;
const SPEED = 1;

// デバイス別スピード調整
let DEVICE_SPEED = SPEED;

if (window.innerWidth <= 1000) {
  // スマホ
  DEVICE_SPEED = 1;
} else {
  // PC
  DEVICE_SPEED = 2.0;
}

let activated = false;

function step() {
  if (!autoScroll || !pano) return;

  // ★ ここを DEVICE_SPEED にする
  pano.scrollLeft += DEVICE_SPEED;
  const end = pano.scrollWidth - pano.clientWidth;

  if (pano.scrollLeft >= end - 2) {
    stopAutoScroll();
    activateButton();
    return;
  }

  rafId = requestAnimationFrame(step);
}


function startAutoScroll() {
  if (autoScroll) return;
  autoScroll = true;
  if (rafId === null) {
    rafId = requestAnimationFrame(step);
  }
}

function stopAutoScroll() {
  autoScroll = false;
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

// ============================
// 終端ボタン有効化
// ============================

function activateButton() {
  if (activated) return;
  activated = true;

  if (gotoBtn) {
    gotoBtn.classList.remove("pano-disabled");

    // ★ 次の遷移先
    let nextRoom = null;
    if (currentSet === 1) {
      nextRoom = 2;                   // Room1 → Room2
      gotoBtn.textContent = "Go to Room2";
    } else if (currentSet === 2) {
      nextRoom = 3;                   // Room2 → Room3
      gotoBtn.textContent = "Go to Room3";
    } else if (currentSet === 3) {
      nextRoom = "story";             // Room3 → ストーリーボード
      gotoBtn.textContent = "Go to Storyboad";
    }

    // ★ ボタンクリック動作を上書き
    gotoBtn.onclick = (e) => {
      e.preventDefault();

      // Room3 → 外部
      if (nextRoom === "story") {
        window.location.href = "./halloween_story.html";
        return;
      }

      // Room1/2 → タブ切り替えを実行
      const nextBtn = document.querySelector(
        `.pano-tab[data-pano-set="${nextRoom}"]`
      );
      if (nextBtn) nextBtn.click();
    };
  }
}


function deactivateButton() {
  activated = false;
  if (gotoBtn) gotoBtn.classList.add("pano-disabled");
}

function deactivateButton() {
  activated = false;
  if (gotoBtn) {
    gotoBtn.classList.add("pano-disabled");  // ← 完全に非表示へ
    gotoBtn.onclick = null;                  // ← イベント削除
  }
}

// ============================
// クリックで自動送り ＋ BGM 起動
// ============================

if (pano) {
  pano.addEventListener("click", () => {
    if (window.bgmControl && window.bgmControl.playOnFirstInteraction) {
      window.bgmControl.playOnFirstInteraction();
    }

    if (!autoScroll) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
  });

  // 手動スクロールでも端まで行ったらボタン有効化
  pano.addEventListener("scroll", () => {
    const end = pano.scrollWidth - pano.clientWidth;
    if (pano.scrollLeft >= end - 2) {
      activateButton();
    }
  });
}

// ============================
// スマホ用スワイプ（触ったら自動送り停止）
// ============================

let pDown = false;
let pStartX = 0;
let pScroll = 0;
let isDragging = false;   // ★ 追加：ドラッグ判定用

if (pano) {
  pano.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;   // PCは無視

    pDown = true;
    isDragging = false;
    pStartX = e.clientX;
    pScroll = pano.scrollLeft;
    pano.setPointerCapture(e.pointerId);
    // ★ ここでは stopAutoScroll() しない
  });

  pano.addEventListener("pointermove", (e) => {
    if (!pDown) return;
    const dx = e.clientX - pStartX;

    // 一定以上動いたら「ドラッグ」とみなして自動送り停止
    if (Math.abs(dx) > 5) {
      if (!isDragging) {
        isDragging = true;
        if (autoScroll) {
          stopAutoScroll();
        }
      }
      pano.scrollLeft = pScroll - dx;
    }
  });

  pano.addEventListener("pointerup", (e) => {
    if (!pDown) return;
    pDown = false;
    isDragging = false;
    pano.releasePointerCapture(e.pointerId);
  });

  pano.addEventListener("pointercancel", (e) => {
    if (!pDown) return;
    pDown = false;
    isDragging = false;
    pano.releasePointerCapture(e.pointerId);
  });
}


// ============================
// タブ切り替え（div 内だけ差し替え）
// ============================

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const setId = Number(btn.dataset.panoSet);
    if (!PANO_SETS[setId]) return;

    // タブUI切替
    tabButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    // ★ 最初にボタンを強制的に隠す
    deactivateButton();

    // BGM切替
    if (window.bgmControl && window.bgmControl.setRoom) {
      window.bgmControl.setRoom(setId);
    }

    // パノラマ再構築
    buildPanorama(setId);
  });
});


buildPanorama(currentSet);
