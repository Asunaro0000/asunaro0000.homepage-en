// bgm.js
// 森ギャラリー用 BGM コントローラ
// - 初回タップで再生開始（モバイル対策）
// - ボタンで ON / OFF トグル
// - ページが裏に行ったら一時停止

(() => {
  const btn = document.getElementById("bgm-toggle");
  if (!btn) return;

  const BGM_SRC = "assets/bgm/bgm.m4a";

  let audio = null;
  let isPlaying = false;
  let isInitialized = false;

  function updateButton() {
    if (!btn) return;
    btn.classList.toggle("is-on", isPlaying);
    btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    btn.textContent = isPlaying ? "♪ BGM ON" : "♪ BGM";
  }

  function initAudio() {
    if (isInitialized) return;
    isInitialized = true;

    audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.6; // 音量はお好みで 0.0〜1.0

    // 再生が終わることはないが、一応エラーハンドリング
    audio.addEventListener("error", () => {
      console.warn("BGM の読み込みに失敗しました:", BGM_SRC);
    });
  }

  async function togglePlay() {
    if (!audio) {
      initAudio();
    }
    if (!audio) return;

    if (!isPlaying) {
      try {
        await audio.play();
        isPlaying = true;
      } catch (err) {
        console.warn("BGM の再生がブロックされました:", err);
        // 失敗した場合は状態を戻す
        isPlaying = false;
      }
    } else {
      audio.pause();
      isPlaying = false;
    }

    updateButton();
  }

  // ボタンタップで BGM トグル
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    togglePlay();
  });

  // ページが裏に行ったら一時停止（戻ったときは手動で再ON）
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && audio && isPlaying) {
      audio.pause();
      isPlaying = false;
      updateButton();
    }
  });

  // 初期表示
  updateButton();
})();
