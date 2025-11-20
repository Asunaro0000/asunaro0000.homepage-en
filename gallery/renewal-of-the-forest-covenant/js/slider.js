// tiny helpers
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// ---- 編集ポイント：この配列を書き換えて使う ----
const slides = [
  {
    src: "./thumbnail/kv01.webp",
    thumb: "./thumbnail/kv01.webp",
    href: "https://asunaro0000.github.io/Renewal-of-the-Forest-Covenant/",
    title: "Renewal of the Forest Covenant — Storyboard",
    caption: "The ancient promise dwelling in the forest stirs once more. A sequence of scenes depicting the renewal through background art and atmospheric storytelling."
  },
  {
    src: "./thumbnail/kv02.webp",
    thumb: "./thumbnail/kv02.webp",
    href: "./Forest_of_Story_Marks/index.html",
    title: "Forest of Story Marks — Single Scene",
    caption: "Moments preserved like bookmarks, expressed through quiet, atmospheric background art."
  },
  {
    src: "./thumbnail/kv03.webp",
    thumb: "./thumbnail/kv03.webp",
    href: "./Forest-Sprits/index.html",
    title: "Forest of Spirits — Single Scene",
    caption: "A small gallery capturing one-scene glimpses of spirits within the forest. The gentle background motion subtly suggests a path leading deeper inside."
  },
  {
    src: "./thumbnail/kv04.webp",
    thumb: "./thumbnail/kv04.webp",
    href: "./Forest-panorama-background/index.html",
    title: "Life of the Forest — Panorama",
    caption: "A horizontal reference exhibit organizing forest structures, flows of light, fallen logs, stumps, and shrines. Useful for background creation and worldbuilding, allowing a clear view of the forest’s continuous landscape."
  },
];


function createSlider(mount, slides = []){
  const track  = mount.querySelector(".sld__track");
  const dots   = mount.querySelector(".sld__dots");
  const thumbs = mount.querySelector(".sld__thumbs");
  const title  = mount.querySelector(".sld__title");
  const capEl  = mount.querySelector("#caption");

  // slides -> DOM
  track.innerHTML = slides.map(s => `
    <div class="sld__slide">
      ${s.href ? `<a class="sld__link" href="${s.href}">` : `<span class="sld__link">`}
        <img src="${s.src}" alt="${s.title || ''}" loading="eager">
      ${s.href ? `</a>` : `</span>`}
    </div>
  `).join("");

  dots.innerHTML = slides.map((_, i) => `<button class="sld__dot" data-i="${i}" aria-label="Go to slide ${i+1}"></button>`).join("");
  thumbs.innerHTML = slides.map((s, i) => `
    <button class="sld__th" data-i="${i}" aria-label="Preview ${i+1}">
      <img src="${s.thumb || s.src}" alt="">
    </button>
  `).join("");

  let idx = 0, n = slides.length;
  function update(i){
    if (!n) return;
    idx = (i + n) % n;
    track.style.transform = `translateX(${-100 * idx}%)`;
    $$(".sld__dot", dots).forEach((d,k)=>d.classList.toggle("active", k===idx));
    $$(".sld__th",  thumbs).forEach((t,k)=>t.classList.toggle("active", k===idx));
    title.textContent = slides[idx]?.title || "";
    capEl.textContent = slides[idx]?.caption || "";
  }


  dots.addEventListener("click", (e)=>{
    const b = e.target.closest(".sld__dot"); if(!b) return;
    update(parseInt(b.dataset.i,10));
  });
  thumbs.addEventListener("click", (e)=>{
    const b = e.target.closest(".sld__th"); if(!b) return;
    update(parseInt(b.dataset.i,10));
  });

  // drag/swipe (avoid hijacking <a> click)
  let sx=null, anchor=null;
  track.addEventListener("pointerdown", (e)=>{
    anchor = e.target.closest("a");
    sx = e.clientX;
    if (!anchor) track.setPointerCapture(e.pointerId);
  });
  track.addEventListener("pointerup", (e)=>{
    if (sx===null) return;
    const dx = e.clientX - sx;
    if (!anchor && Math.abs(dx) > 40){
      update(idx + (dx < 0 ? 1 : -1));
    } else if (anchor && Math.abs(dx) < 6){
      anchor.click();
    }
    sx=null; anchor=null;
  });

  update(0);
  return {update};
}

// init
createSlider(document.getElementById("work-slider"), slides);
