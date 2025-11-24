// ============================
// 今日情報
// ============================
const TODAY = new Date();
const TODAY_YEAR = TODAY.getFullYear();
const TODAY_MONTH = TODAY.getMonth() + 1; // 1〜12
const TODAY_DAY = TODAY.getDate();
const TODAY_WEEKDAY = TODAY.getDay(); // 0=Sun .. 6=Sat

// ============================
// 現在表示中の年月（初期表示 → 今日）
// ※カレンダー帯はそのまま「年月」で動かす
// ============================
let currentYear = TODAY_YEAR;
let currentMonth = TODAY_MONTH;

// 曜日ラベル
const WEEK_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEK_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]; // フォルダ名用
const TOTAL_COLUMNS = 31; // 幅固定のため常に31列

// ============================
// 曜日ごとの画像スタック
//   日曜 → assets/calendar/sun/01.webp, 02.webp...
//   月曜 → assets/calendar/mon/01.webp, 02.webp...
// ============================
const WEEKDAY_IMAGE_STACK = {
  sun: [
    "assets/calendar/sun/01.webp",
    "assets/calendar/sun/02.webp",
  ],
  mon: [
    "assets/calendar/mon/01.webp",
    "assets/calendar/mon/02.webp",
  ],
  tue: [
    "assets/calendar/tue/01.webp",
  ],
  wed: [
    "assets/calendar/wed/01.webp",
  ],
  thu: [
    "assets/calendar/thu/01.webp",
  ],
  fri: [
    "assets/calendar/fri/01.webp",
  ],
  sat: [
    "assets/calendar/sat/01.webp",
  ],
};

// ============================
// 曜日画像を更新する
//   weekdayIndex: 0〜6 (0=Sun)
//   index: スタック内の何枚目を表示するか（省略時0）
//   withAnimation: 切り替え時にフェードさせるか
// ============================
function updateWeekdayImage(weekdayIndex, index, withAnimation = false) {
  const img = document.getElementById("month-image");
  if (!img) return;

  const key = WEEK_KEYS[weekdayIndex]; // "sun" など
  const stack = WEEKDAY_IMAGE_STACK[key];
  if (!stack || stack.length === 0) {
    img.removeAttribute("src");
    img.removeAttribute("data-index");
    img.removeAttribute("data-weekday");
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
      img.dataset.weekday = String(weekdayIndex);
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, 150);
  } else {
    img.src = stack[clampedIndex];
    img.dataset.index = String(clampedIndex);
    img.dataset.weekday = String(weekdayIndex);
  }
}

// ============================
// カレンダー帯を描画
// （ここは従来どおり「年月の帯」。画像だけ曜日運用）
// ============================
function renderStrip(year, month) {
  const labelEl = document.getElementById("strip-label");
  const weekdaysRow = document.getElementById("strip-weekdays");
  const datesRow = document.getElementById("strip-dates");

  if (!labelEl || !weekdaysRow || !datesRow) return;

  // ヘッダー表記：Year 2026 · 11
  labelEl.textContent = `Year ${year} · ${month}`;

  // 画像は「今日の曜日」で同期（ここはアニメなしで即時反映）
  updateWeekdayImage(TODAY_WEEKDAY, 0, false);

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
// 月移動（関数自体は残すが、ボタンからは呼ばない）
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

document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("month-image");
  if (!img) return;

  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    window.location.href = "/gallery/renewal-of-the-forest-covenant/Forest-calendar/";
  });
});


// ============================
// 初期化
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".nav-prev");
  const nextBtn = document.querySelector(".nav-next");

  // ▼ 月切り替えトグルだけ無効化（イベント登録しない）
  if (prevBtn) {
    prevBtn.disabled = true;
    prevBtn.setAttribute("aria-disabled", "true");
    prevBtn.style.cursor = "default";
    prevBtn.style.opacity = "0.35";
  }
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.setAttribute("aria-disabled", "true");
    nextBtn.style.cursor = "default";
    nextBtn.style.opacity = "0.35";
  }

  // 最初に開いた時は「今日の年月」を表示
  renderStrip(currentYear, currentMonth);

  // 画像は「今日の曜日フォルダ」からランダム切り替え運用
  setupWeekdayImageClick();
});
