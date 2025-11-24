// 画像フォルダ（相対パス）。必要に応じて変更
const STAMP_PATH = "./assets/stamps/";

// ファイル名（拡張子なし）。ここに追記するだけで増やせる
const stampNames = [
  "いま行く！","おはよー！","ごめんね","しあわせ～","とまらない～！","ねむねむ…","あそぼ～","いい感じ！",
  "はぁ～…","ばっちり！","ふぇ？","またね！","もうだめ～…","もぉ～！",
  "わかんない！","今日もおつかれ！"
];

// 要素取得
const wrap  = document.getElementById("risuko-stamp");
const img   = document.getElementById("risuko-stamp-img");
const text  = document.getElementById("risuko-stamp-text");
const btn   = document.getElementById("risuko-stamp-btn");

// 年内通し日で日替わりインデックス
function dayOfYear(d){
  const s = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - s) / 86400000);
}
let currentIndex = dayOfYear(new Date()) % stampNames.length;

// 表示適用
function applyByIndex(i){
  const name = stampNames[i];
  // フェードアウト
  img.classList.add("rs-swap-out");
  // 少し待って差し替え → フェードイン
  setTimeout(() => {
    img.src = STAMP_PATH + encodeURIComponent(name) + ".webp";
    img.alt = name;
    text.textContent = name;
    img.onload = () => img.classList.remove("rs-swap-out");
  }, 120);
  window.preloadAround && window.preloadAround(stampNames, i, STAMP_PATH, ".webp");
  

}

applyByIndex(currentIndex);

// クリック（ボタン）でランダム切替
btn.addEventListener("click", () => {
  let r = Math.floor(Math.random() * stampNames.length);
  if (r === currentIndex) r = (r + 1) % stampNames.length;
  currentIndex = r;
  applyByIndex(currentIndex);

  // （任意）GAにイベント送信する場合はコメントアウトを外す
  // if (window.gtag) gtag("event", "risuko_click", { value: currentIndex });
});

// 画像自体のクリックでも切替したい場合は下を有効化
wrap.addEventListener("click", (e) => {
  if (e.target.id !== "risuko-stamp-btn") btn.click();
});

