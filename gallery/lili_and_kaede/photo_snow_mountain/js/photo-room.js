// photo-room.js
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".gallery-track");
  const panels = Array.from(document.querySelectorAll(".photo-panel"));
  const slideButtons = Array.from(document.querySelectorAll(".slide-btn"));
  const lamps = Array.from(document.querySelectorAll(".lamp"));
  const images = Array.from(document.querySelectorAll(".photo-card img"));

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.querySelector(".lightbox-close");
  const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

  let currentIndex = 0;
  let isMobile = window.matchMedia("(max-width: 720px)").matches;

  // --- キャプション ---
const CAPTIONS = {
  "1-1": "Snow hill dash begins! ❄️💨\nStarting at full power with zero stamina management? Totally reckless — but who cares, it's fun!",
  "1-2": "Just walking a forest trail but it already feels like an adventure 🌲✨\nThe moment I hear “Wanna go that way?” my head says yes before I think.",
  "1-3": "Trying to enjoy the scenery…but there’s a snowball assassin prepping behind me 🤣❄️\nThere’s no way this won’t turn into a battle!",
  "1-4": "Stepped into a snow tunnel and the hype exploded ⛄️🎉\nJumped on “Ready, go!” and screamed because we flew way higher than planned.",
  "1-5": "Running full speed with no destination decided!? 😆💥\nBut somehow it feels like everything will work out if we keep this momentum.",
  "1-6": "The moment we entered the cave the excitement spiked 🔦❄️\nKinda scary, but having someone next to you makes you fearless.",
  "1-7": "Snow and ocean together — way too beautiful 🌊❄️\nHolding hot drinks and repeating “I don’t wanna go home…” over and over.",
  "1-8": "Bench chill time ☕️💤\nWe were sprinting five minutes ago and now we’re completely powered off — hilarious contrast.",
  "1-9": "The second we caught our breath we burst into laughter again 🔥😆\nFeels like things are only about to get even more fun from here!",

  "2-1": "Just sitting down and suddenly it feels like a story began ❄️🔥\nWatching her go “Look, the snow’s dancing!” warms my heart instantly.",
  "2-2": "Speed play always ends like this 💨🤣\nOnce I see that “We can go faster” face there’s no way I’m not accelerating.",
  "2-3": "Someone suddenly declares themselves the adventure leader 🤣❄️\nThe moment I hear “Follow me!” my hype level jumps a gear.",
  "2-4": "Ridiculously risky jump but full confidence 🏂💥\nThat look right before a challenge — that’s pure excitement.",
  "2-5": "Exploration using a handmade cave “map” 📍🧭\nWe’re definitely lost, but they look happy so whatever!",
  "2-6": "Camera pointed → instantly goes into dramatic ice-throne acting mode 📸❄️\nWhen the vibes line up perfectly, the excitement just won’t stop!",
  "2-7": "Ice tunnel speed-run time 💫🛼\nThe echoes of laughter + the thrill of being chased = unforgettable.",
  "2-8": "Climbing an ice wall!? 🧗‍♀️🔥\nShe’s going so hard it’s exhausting to watch — fun level 100/100.",
  "2-9": "Curiosity too strong — steps get faster 💫😳\nTrying and failing to hide “I’m not done playing yet” and it’s adorable.",

  "3-1": "Got scared and stepped back, then instantly regretted it 🧊😣\nBut the determination leaking out says she’ll definitely tackle it next time.",
  "3-2": "Random dramatic pose to show the way — incredible comedic timing 💫🤣\nOnce invited, I have zero reason to say no.",
  "3-3": "Surprise gift event caught her totally off guard 🎁😆\nConfusion + happiness mixing on her face = rare and priceless.",
  "3-4": "Found an old machine and hype skyrocketed ⚙️🔥\nDoesn’t matter if we understand it or not — “Let’s try!” is justice.",
  "3-5": "Secret talk under a lantern light 🕯️🌙\nTrying to whisper but the excitement is absolutely not quiet.",
  "3-6": "Drawn into a narrow alley like a magnet 🎒💫\nThat step filled with “We might find something crazy” is the best thrill.",
  "3-7": "Falling or failing doesn’t matter — full-power attack anyway 💥😆\nTurning fun into a challenge makes everything escalate fast.",
  "3-8": "Night corridor exploration with just a lantern 🕯️🌌\nA little scared but laughing anyway — wanting to enjoy even the fear hits hard.",
  "3-9": "Touched an old device and something lit up 💡⚡️\n“WHAT WAS THAT?!” panic-laughing together — unpredictable excitement is the most addictive!",

  "4-1": "Caught some kind of glowing power in the snow and the whole scenery suddenly felt like a buff 🤣✨\nConfidence meter went max — no matter what happens we’re gonna enjoy it.",
  "4-2": "Just standing close softens the atmosphere 🤝😊\nThey definitely know they feel safer the more they walk together.",
  "4-3": "Laughing by the campfire warms the heart as well as the body 🔥😌\nThis calm is way too perfect to call it a day yet.",
  "4-4": "A streak of red running through the snowy scene = instant main-character energy 😂🔥\nCompletely ready for whatever comes next!",
  "4-5": "Talking in front of the big tree with zero brakes 🌙🕯️\nWhen someone asks “What was your favorite moment today?” you know it’s emotional.",
  "4-6": "Night sky was unreal levels of beautiful 🌌✨\nToo cold to stay, too happy to leave — silent staring = pure bliss.",
  "4-7": "Screaming “MY FINGERS ARE WARM!!!” in front of the stove 🤣🔥\nQuiet forest + crackling fire + hype = impossible not to run out for round two.",
  "4-8": "Leaning together under starlight 🌟😳\nNo words, just happiness — heartbeat louder than the snow around us.",
  "4-9": "Looked at our photos and we were having WAY too much fun 📱🔥\nInstant realization: “We were absolutely legendary today.”",

  "5-1": "Waving back at the path we enjoyed — peak youth moment 🤣✨\nOverflowing with “I wanna remember this forever!” vibes.",
  "5-2": "Everyone around has their normal night, but we’re still in full-throttle youth mode 🤣✨\nIn the city noise, our memories are the only thing at MAX volume.",
  "5-3": "Shoulder touch → system crash → brain overheats 😳🔥\nFrozen in place because moving away would’ve hurt more.",
  "5-4": "Got caught staring and she hit me with “What?” — absolutely fatal 😱❤️\nTrying to hide the smile but completely failing.",
  "5-5": "The whole night view was glittering, but the center of my vision was just one person 🌃💞\nHow does cold air make emotions burn hotter?",
  "5-6": "On the rooftop, 100% forbidden — but the desire won 🤣⛄️\nScreaming into the sky and hearing it disappear felt insanely good.",
  "5-7": "Talking about nothing while warming up with soup 🔥❄️\nSomehow that quiet moment was the happiest part of the day.",
  "5-8": "Seconds before giving the present — both about to explode from nerves 🤣💝\nOne little gift sending the heart rate into orbit = pure youth energy.",
  "5-9": "She pulled me close and the whole world blurred except her 🙌🔥\nHer joyful hug was so intense I couldn’t stop smiling back!",
};


  // --- スライド切り替え（PC向け） ---
  function goToPanel(index) {
    currentIndex = Math.max(0, Math.min(panels.length - 1, index));
    if (!isMobile) {
      const offset = -100 * currentIndex;
      track.style.transform = `translateX(${offset}%)`;
    } else {
      // モバイルは横スクロールで移動
      panels[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }

    slideButtons.forEach((btn, i) => {
      btn.classList.toggle("is-active", i === currentIndex);
    });

    lamps.forEach((lamp, i) => {
      lamp.classList.toggle("is-active", i === currentIndex);
    });
  }

  slideButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      goToPanel(index);
    });
  });

  // === ライトボックス用配列（DOM順） ===
  const orderedImages = images.map(img => ({
    src: img.getAttribute("src"),
    id: img.dataset.imageId
  }));

  let lightboxIndex = -1;

  // index指定でライトボックスを表示
  function showLightboxByIndex(i) {
    if (i < 0 || i >= orderedImages.length) return;

    const item = orderedImages[i];
    lightboxIndex = i;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.id;
    lightboxCaption.textContent = CAPTIONS[item.id] || "Today’s snapshot ❄️";

    lightbox.classList.remove("hidden");
  }

  // サムネイルクリック時
  function openLightbox(imgEl) {
    const id = imgEl.dataset.imageId || "";
    const index = orderedImages.findIndex(v => v.id === id);
    if (index === -1) return;
    showLightboxByIndex(index);
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightboxCaption.textContent = "";
    lightboxIndex = -1;
  }

  // 画像クリック → ライトボックスを開く
  images.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
  });

  // ライトボックス画像をクリック → 同じ章の次へ
  lightboxImg.addEventListener("click", () => {
    if (lightboxIndex < 0) return;

    const current = orderedImages[lightboxIndex];
    const [chapter, numStr] = (current.id || "").split("-");
    const num = Number(numStr);

    if (!chapter || !Number.isFinite(num)) return;

    const nextId = `${chapter}-${num + 1}`;
    const nextIndex = orderedImages.findIndex(v => v.id === nextId);

    // その章に次がなければ（例: 1-9 → 1-10 不在）そこで停止
    if (nextIndex === -1) return;

    showLightboxByIndex(nextIndex);
  });

  // 閉じる系
  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeLightbox();
    }
  });

  // --- モード変更（PC / モバイル） ---
  function handleResize() {
    const mobileNow = window.matchMedia("(max-width: 720px)").matches;
    if (mobileNow !== isMobile) {
      isMobile = mobileNow;
      if (!isMobile) {
        // PCに戻ったらスライダー位置をリセット
        track.style.transform = `translateX(${-100 * currentIndex}%)`;
      } else {
        track.style.transform = "none";
      }
    }
  }

  window.addEventListener("resize", handleResize);

  // 初期状態
  handleResize();
  goToPanel(0);
});
// bgm.js - 3曲プレイリスト再生
document.addEventListener("DOMContentLoaded", () => {
  // ====== プレイリスト定義 ======
  // ★ここを自分のファイル名に差し替えて使う
  const PLAYLIST = [
    "./assets/bgm/Hey Wait Up.mp3",
    "./assets/bgm/Racing Through Winter.mp3",

  ];

  const audio = document.getElementById("bgm-audio");
  const btn = document.getElementById("bgm-toggle");
  const label = document.getElementById("bgm-file-label");

  if (!audio || !btn) return;

  let currentIndex = 0;

function getFileNameFromPath(path) {
  if (!path) return "";
  const noQuery = path.split("?")[0];
  const file = noQuery.split("/").pop();
  return file.replace(/\.mp3$/i, "");   // .mp3 を削除
}

  function setTrack(index) {
    if (!PLAYLIST.length) return;
    currentIndex = (index + PLAYLIST.length) % PLAYLIST.length;
    const src = PLAYLIST[currentIndex];
    audio.src = src;
    if (label) {
      label.textContent = getFileNameFromPath(src);
    }
  }

  // 最初の曲をセット
  setTrack(0);

  // ====== ボタン操作 ======
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btn.classList.add("is-playing");
      if (label) label.style.opacity = "1";
    } else {
      audio.pause();
      btn.classList.remove("is-playing");
      if (label) label.style.opacity = "0.7";
    }
  });

  // ====== 曲が終わったら次の曲へ（3曲ループ） ======
  audio.addEventListener("ended", () => {
    setTrack(currentIndex + 1);  // 次の曲へ
    audio.play();                // 自動再生
  });
});
