// 画像フォルダ（相対パス）。必要に応じて変更
const STAMP_PATH_2 = "./stamps2/";

// ファイル名（拡張子なし）。1つ目と同じ配列を使い回すならコピペでOK

const stampNames2 = [
  "Snack time!", "Apple time♪", "So tasty!", "So toasty!", "Sweet tooth wins!",
  "Food over flowers♪", "Freshly made!", "I like veggies too!", "Sweet happiness🍯",
  "A cozy break☕", "Nice and warm☕",
  "Spoil-me time", "Ice even in autumn!", "Sweet bliss🍰", "Warm milk♪",
  "Feeling toasty🍲", "Lets share🥕",
  "Autumn treat🍊", "All this is mine!✨", "My autumn reward♡",
  "Warm dinner night🌙", "Freshly baked tart♪",
  "Lunch time!", "So comforting🦉", "Perfect picnic day🍞",
  "Happiness overload!🥞",
];
// 要素取得（※ここが1つ目と違う）
const wrap2 = document.getElementById("risuko-stamp-2");
const img2  = document.getElementById("risuko-stamp-img-2");
const text2 = document.getElementById("risuko-stamp-text-2");
const btn2  = document.getElementById("risuko-stamp-btn-2");

// 年内通し日で日替わりインデックス
function dayOfYear2(d){
  const s = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - s) / 86400000);
}
let currentIndex2 = dayOfYear2(new Date()) % stampNames2.length;

// 表示適用
function applyByIndex2(i){
  const name = stampNames2[i];
  // フェードアウト
  img2.classList.add("rs-swap-out");
  // 少し待って差し替え → フェードイン
  setTimeout(() => {
    img2.src = STAMP_PATH_2 + encodeURIComponent(name) + ".webp";
    img2.alt = name;
    text2.textContent = name;
    img2.onload = () => img2.classList.remove("rs-swap-out");
  }, 120);
  function applyByIndex2(i){
  // ...表示更新の処理...
  window.preloadAround && window.preloadAround(stampNames2, i, STAMP_PATH_2, ".webp");
}


}

applyByIndex2(currentIndex2);

// クリック（ボタン）でランダム切替
btn2.addEventListener("click", () => {
  let r = Math.floor(Math.random() * stampNames2.length);
  if (r === currentIndex2) r = (r + 1) % stampNames2.length;
  currentIndex2 = r;
  applyByIndex2(currentIndex2);

  // GAイベント名も分けたい場合
  // if (window.gtag) gtag("event", "risuko2_click", { value: currentIndex2 });
});

// 画像自体のクリックでも切替（ボタン以外のクリックで反応）
wrap2.addEventListener("click", (e) => {
  if (e.target.id !== "risuko-stamp-btn-2") btn2.click();
});
