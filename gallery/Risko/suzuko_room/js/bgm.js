// js/bgm.js
document.addEventListener("DOMContentLoaded", () => {
  const audioEl = document.getElementById("bgm-audio");
  const toggleBtn = document.getElementById("bgm-toggle");

  if (!audioEl || !toggleBtn) return;

  // 再生するBGMリスト（順番再生 → ループ）
  const PLAYLIST = [
    "./assets/bgm/bgm1.mp3",
    "./assets/bgm/bgm2.mp3",
    "./assets/bgm/bgm3.mp3"
  ];

  let currentIndex = 0;
  let isPlaying = false;

  // 現在のインデックスの曲をセットして再生
  function playCurrentTrack() {
    const src = PLAYLIST[currentIndex];
    if (!src) return;

    // ソースをセット
    if (audioEl.src !== new URL(src, window.location.href).href) {
      audioEl.src = src;
    }

    audioEl
      .play()
      .then(() => {
        isPlaying = true;
        toggleBtn.classList.add("is-playing");
        toggleBtn.setAttribute("aria-pressed", "true");
        // ボタン表示はお好みで調整
        // toggleBtn.textContent = "♪ BGM ON";
      })
      .catch((err) => {
        console.error("BGM play error:", err);
      });
  }

  // 一時停止
  function pauseBgm() {
    audioEl.pause();
    isPlaying = false;
    toggleBtn.classList.remove("is-playing");
    toggleBtn.setAttribute("aria-pressed", "false");
    // toggleBtn.textContent = "♪";
  }

  // プレイリストの次の曲へ（最後まで行ったら先頭に戻る）
  function playNextTrack() {
    currentIndex++;
    if (currentIndex >= PLAYLIST.length) {
      currentIndex = 0;
    }
    playCurrentTrack();
  }

  // トグルボタンクリック
  toggleBtn.addEventListener("click", () => {
    if (!isPlaying) {
      // 初回 or 停止状態 → 再生
      playCurrentTrack();
    } else {
      // 再生中 → 一時停止
      pauseBgm();
    }
  });

  // 1曲終わったら次の曲へ → プレイリストをループ
  audioEl.addEventListener("ended", () => {
    playNextTrack();
  });

  // ページ遷移前などに明示的に止めたい場合（任意）
  window.addEventListener("beforeunload", () => {
    if (!audioEl.paused) {
      audioEl.pause();
    }
  });
});
