// ============================
// 今日情報
// ============================
const TODAY = new Date();
const TODAY_YEAR = TODAY.getFullYear();
const TODAY_MONTH = TODAY.getMonth() + 1; // 1〜12
const TODAY_DAY = TODAY.getDate();

// ============================
// 現在表示中の年月（初期表示 → 今日）
// ============================
let currentYear = TODAY_YEAR;
let currentMonth = TODAY_MONTH;

// 曜日ラベル
const WEEK_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const TOTAL_COLUMNS = 31; // 幅固定のため常に31列

// ============================
// 月ごとの画像スタック
//   1月 → 1-1, 1-2, 1-3 ...
//   2月 → 2-1, 2-2 ...
// 必要なところだけ埋めればOK
// ============================
const MONTH_IMAGE_STACK = {
  1: [
    "assets/calendar/1-1.webp",
    "assets/calendar/1-2.webp",
    "assets/calendar/1-3.webp",
  ],
  2: [
    "assets/calendar/2-1.webp",
    "assets/calendar/2-2.webp",
  ],
  3: ["assets/calendar/3-1.webp"],
  4: ["assets/calendar/4-1.webp"],
  5: ["assets/calendar/5-1.webp"],
  6: ["assets/calendar/6-1.webp"],
  7: ["assets/calendar/7-1.webp"],
  8: ["assets/calendar/8-1.webp"],
  9: ["assets/calendar/9-1.webp"],
  10: ["assets/calendar/10-1.webp"],
  11: ["assets/calendar/11-1.webp"],
  12: ["assets/calendar/12-1.webp"],
};

// ============================
// 月画像を更新する
//   month: 1〜12
//   index: スタック内の何枚目を表示するか（省略時0）
//   withAnimation: 切り替え時にフェードさせるか
// ============================
function updateMonthImage(month, index, withAnimation = false) {
  const img = document.getElementById("month-image");
  if (!img) return;

  const stack = MONTH_IMAGE_STACK[month];
  if (!stack || stack.length === 0) {
    img.removeAttribute("src");
    img.removeAttribute("data-index");
    return;
  }

  const nextIndex =
    typeof index === "number" ? index : 0;
  const clampedIndex = Math.max(
    0,
    Math.min(nextIndex, stack.length - 1)
  );

  if (withAnimation) {
    // ふわっと消える → 画像差し替え → ふわっと戻る
    img.style.opacity = "0";
    img.style.transform = "scale(0.98)";

    setTimeout(() => {
      img.src = stack[clampedIndex];
      img.dataset.index = String(clampedIndex);
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, 150); // ここでフェードアウト時間と合わせる
  } else {
    img.src = stack[clampedIndex];
    img.dataset.index = String(clampedIndex);
  }
}

// ============================
// カレンダー帯を描画
// ============================
function renderStrip(year, month) {
  const labelEl = document.getElementById("strip-label");
  const weekdaysRow = document.getElementById("strip-weekdays");
  const datesRow = document.getElementById("strip-dates");

  if (!labelEl || !weekdaysRow || !datesRow) return;

  // ヘッダー表記：Year 2026 · 11
  labelEl.textContent = `Year ${year} · ${month}`;

  // 月画像も同期（ここはアニメなしで即時反映）
  updateMonthImage(month, 0, false);

  // 中身クリア
  weekdaysRow.innerHTML = "";
  datesRow.innerHTML = "";

  // この帯が「今日の月」かどうか
  const isCurrentMonthToday =
    year === TODAY_YEAR && month === TODAY_MONTH;

  // その月の日数
  const daysInMonth = new Date(year, month, 0).getDate();

  // 実際の1〜最終日を配置
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month - 1, d);
    const w = dateObj.getDay(); // 0=Sun .. 6=Sat

    // 曜日セル
    const wCell = document.createElement("div");
    wCell.className = "cell-w";
    wCell.textContent = WEEK_LABELS[w];
    if (w === 0) wCell.classList.add("sun");
    if (w === 6) wCell.classList.add("sat");
    weekdaysRow.appendChild(wCell);

    // 日付セル
    const dCell = document.createElement("div");
    dCell.className = "cell-d";
    dCell.textContent = d;
    if (w === 0) dCell.classList.add("sun");
    if (w === 6) dCell.classList.add("sat");

    // 今日だけ丸印
    if (isCurrentMonthToday && d === TODAY_DAY) {
      dCell.classList.add("today");
    }

    datesRow.appendChild(dCell);
  }

  // 足りないぶんは空セルで埋めて幅一定に
  for (let i = daysInMonth + 1; i <= TOTAL_COLUMNS; i++) {
    const emptyW = document.createElement("div");
    emptyW.className = "cell-w empty";
    weekdaysRow.appendChild(emptyW);

    const emptyD = document.createElement("div");
    emptyD.className = "cell-d empty";
    datesRow.appendChild(emptyD);
  }
}

// ============================
// 月移動
// ============================
function gotoPrevMonth() {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  renderStrip(currentYear, currentMonth);
}

function gotoNextMonth() {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
  currentYear++;
  }
  renderStrip(currentYear, currentMonth);
}

// ============================
// 月画像クリック → ランダムに差し替え（アニメ付き）
// ============================
function setupMonthImageClick() {
  const img = document.getElementById("month-image");
  if (!img) return;

  img.addEventListener("click", () => {
    const stack = MONTH_IMAGE_STACK[currentMonth];
    if (!stack || stack.length === 0) return;

    const currentIndex = parseInt(
      img.dataset.index || "0",
      10
    );

    // 1枚しかないときは変わりようがないのでそのまま
    if (stack.length === 1) {
      return;
    }

    // 現在のindexと違うランダムindexを選ぶ
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * stack.length);
    }

    // アニメーション付きで切り替え
    updateMonthImage(currentMonth, nextIndex, true);
  });
}

// ============================
// 初期化
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".nav-prev");
  const nextBtn = document.querySelector(".nav-next");

  if (prevBtn) prevBtn.addEventListener("click", gotoPrevMonth);
  if (nextBtn) nextBtn.addEventListener("click", gotoNextMonth);

  // 最初に開いた時は「今日の年月」を表示
  renderStrip(currentYear, currentMonth);

  // 月画像クリックでスタックからランダム切り替え
  setupMonthImageClick();
});
