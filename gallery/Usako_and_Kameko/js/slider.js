// tiny helpers
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// ---- Replace the text here ----
const slides = [
  {
    src: "./thumbnail/usako_and_kameko.webp",
    thumb: "./thumbnail/usako_and_kameko.webp",
    href: "https://asunaro-0000.itch.io/usako-kameko-between-motion-and-stillness",
    title: "Usako & Kameko — Storyboard",
    caption:
      "A journey through the forest after the rain.\nTheir day is woven into 81 scenes of quiet moments and emotion."
  },
  {
    src: "./thumbnail/usako_diary.webp",
    thumb: "./thumbnail/usako_diary.webp",
    href: "./usako_diary/index.html",
    title: "Usako's Daily Life — Single Scene",
    caption:
      "Meals, walks, and little breaks.\nA day filled with the small joys Usako treasures."
  },
  {
    src: "./thumbnail/kameko_diary.webp",
    thumb: "./thumbnail/kameko_diary.webp",
    href: "./kameko_diary/index.html",
    title: "Kameko's Daily Life — Single Scene",
    caption:
      "Today again, she picks up her brush.\nKameko's days unfold in calm, focused hours of creation."
  }
];

function createSlider(mount, slides = []){
  const track  = mount.querySelector(".sld__track");
  const dots   = mount.querySelector(".sld__dots");
  const thumbs = mount.querySelector(".sld__thumbs");
  const title  = mount.querySelector(".sld__title");
  const capEl  = mount.querySelector("#caption");

  track.innerHTML = slides.map(s => `
    <div class="sld__slide">
      ${s.href ? `<a class="sld__link" href="${s.href}">` : `<span class="sld__link">`}
        <img src="${s.src}" alt="${s.title || ''}" loading="eager">
      ${s.href ? `</a>` : `</span>`}
    </div>
  `).join("");

  dots.innerHTML = slides
    .map((_, i) => `<button class="sld__dot" data-i="${i}" aria-label="Go to slide ${i+1}"></button>`)
    .join("");

  thumbs.innerHTML = slides
    .map((s, i) => `
      <button class="sld__th" data-i="${i}" aria-label="Preview ${i+1}">
        <img src="${s.thumb || s.src}" alt="">
      </button>
    `)
    .join("");

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

createSlider(document.getElementById("work-slider"), slides);
