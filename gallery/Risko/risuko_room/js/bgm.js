// bgm.js
(() => {
  const bgm = document.getElementById('bgmAudio');
  const bgmToggle = document.getElementById('bgmToggle');

  // ★ ここに自分のファイル名を書くだけでOK
  const tracks = [
    './bgm/bgm1.m4a',
    './bgm/bgm2.m4a'
  ];

  let trackIndex = 0;
  let started = false;
  let playing = false;

  function loadTrack(i) {
    if (!bgm || tracks.length === 0) return;
    trackIndex = i % tracks.length;   // 最後まで行ったら先頭に戻る
    bgm.src = tracks[trackIndex];
  }

  async function play() {
    if (!bgm || tracks.length === 0) return;

    if (!bgm.src) {
      loadTrack(0);
    }

    try {
      await bgm.play();
      started = true;
      playing = true;
      if (bgmToggle) {
        bgmToggle.textContent = 'BGM: ON';
        bgmToggle.classList.add('is-on');
      }
    } catch (err) {
      console.warn('BGM play blocked:', err);
    }
  }

  function pause() {
    if (!bgm) return;
    bgm.pause();
    playing = false;
    if (bgmToggle) {
      bgmToggle.textContent = 'BGM: OFF';
      bgmToggle.classList.remove('is-on');
    }
  }

  // 画像側から呼ぶ用：最初のインタラクションで再生
  function playOnFirstInteraction() {
    if (!started) {
      play();
    }
  }

  // 曲が終わったら次へ（最後なら最初へ戻る）
  if (bgm) {
    bgm.addEventListener('ended', () => {
      if (!playing) return;
      loadTrack(trackIndex + 1);
      bgm.play().catch(err =>
        console.warn('Next track play blocked:', err)
      );
    });
  }

  // BGMボタンでON/OFF
  if (bgmToggle) {
    bgmToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // パノラマのクリックイベントに干渉しない
      if (!playing) {
        play();
      } else {
        pause();
      }
    });
  }

  // ★ グローバルにハンドルを出しておく
  window.bgmControl = {
    playOnFirstInteraction,
    play,
    pause,
  };
})();
