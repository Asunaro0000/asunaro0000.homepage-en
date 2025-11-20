// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定
// 画像ごとに個別キャプションを設定
const items = [
  { src: './images/1.webp',  title: 'At the Forest Shrine', caption: '' },
  { src: './images/2.webp',  title: 'Light of the Tree Shrine', caption: '' },
  { src: './images/3.webp',  title: 'Sprout on the Old Stump', caption: '' },
  { src: './images/4.webp',  title: 'Prayer by the Waterside', caption: '' },
  { src: './images/5.webp',  title: 'Lanterns Lighting the Forest', caption: '' },
  { src: './images/6.webp',  title: 'Corridor Along the Stream', caption: '' },
  { src: './images/7.webp',  title: 'Stone Gate of the Forest', caption: '' },
  { src: './images/8.webp',  title: 'Young Leaves Resting on a Stump', caption: '' },
  { src: './images/9.webp',  title: 'Path of the Water Mirror', caption: '' },
  { src: './images/10.webp', title: 'At the Forest Entrance', caption: '' },

  { src: './images/11.webp', title: 'Stillness by the Water', caption: '' },
  { src: './images/12.webp', title: 'Altar of Prayer', caption: '' },
  { src: './images/13.webp', title: 'Garden of Ripples', caption: '' },
  { src: './images/14.webp', title: 'Stories of the Old Stump', caption: '' },
  { src: './images/15.webp', title: 'Whisper of the Wood Spirits', caption: '' },
  { src: './images/16.webp', title: 'Beside the Stone Lantern', caption: '' },
  { src: './images/17.webp', title: 'Beside the Shrine', caption: '' },
  { src: './images/18.webp', title: 'Back of a Wandering Cat', caption: '' },
  { src: './images/19.webp', title: 'Presence Resting in the Forest', caption: '' },
  { src: './images/20.webp', title: 'Quiet Offering Stand', caption: '' },

  { src: './images/21.webp', title: 'Cloth Crossing the Autumn Sky', caption: '' },
  { src: './images/22.webp', title: 'Path of Soft Light', caption: '' },
  { src: './images/23.webp', title: 'Calm Beside the Water', caption: '' },
  { src: './images/24.webp', title: 'Gaze from the Treetops', caption: '' },
  { src: './images/25.webp', title: 'Trail of Stumps', caption: '' },
  { src: './images/26.webp', title: 'Warm Spring by the Forest', caption: '' },
  { src: './images/27.webp', title: 'Guiding Lanterns', caption: '' },
  { src: './images/28.webp', title: 'Breath Rising Through the Green', caption: '' },
  { src: './images/29.webp', title: 'Traveler in Ritual Garments', caption: '' },
  { src: './images/30.webp', title: 'Bird on the Treetop', caption: '' },

  { src: './images/31.webp', title: 'Morning Echoes', caption: '' },
  { src: './images/32.webp', title: 'Passing Through the Birch Trees', caption: '' },
  { src: './images/33.webp', title: 'Two Presences Leaning Close', caption: '' },
  { src: './images/34.webp', title: 'Guided by the Blue Flame', caption: '' },
  { src: './images/35.webp', title: 'Preparing in the Shade', caption: '' },
  { src: './images/36.webp', title: 'Rings Resonating in the Forest', caption: '' },
  { src: './images/37.webp', title: 'Presence from Above', caption: '' },
  { src: './images/38.webp', title: 'Road Toward Home', caption: '' },
  { src: './images/39.webp', title: 'Gate of Inscribed Wood', caption: '' },
  { src: './images/40.webp', title: 'Eyes Drifting Into Sleep', caption: '' },

  { src: './images/41.webp', title: 'Whisper of Water Sounds', caption: '' },
];





const gallery = $("#cardGallery");
gallery.innerHTML = items.map((it, i)=>`
  <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
    <div class="card__imgwrap">
      <img src="${it.src}" alt="${it.title}" loading="lazy">
    </div>
    <figcaption class="card__meta">
      <h3 class="card__title">${it.title}</h3>
      <p class="card__caption">${it.caption}</p>
    </figcaption>
  </figure>
`).join("");

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

let idx = -1;

let viewStartTime = null;
let viewImageIndex = null;

function startImageViewTracking(index) {
  viewImageIndex = index;
  viewStartTime = performance.now();
}

function stopImageViewTracking() {
  if (viewStartTime == null || viewImageIndex == null) return;

  const elapsedMs = performance.now() - viewStartTime;
  const elapsedSec = Math.round(elapsedMs / 1000);

  // 1秒未満はノイズとして無視
  if (elapsedSec > 0 && typeof gtag === "function") {
    const it = items[viewImageIndex];
    gtag('event', 'image_view', {
      image_index: viewImageIndex,
      image_title: it.title,
      view_seconds: elapsedSec
    });
  }

  viewStartTime = null;
  viewImageIndex = null;
}

function openLB(i){
  // 直前に見ていた画像の閲覧時間を確定
  if (idx >= 0) {
    stopImageViewTracking();
  }

  idx = (i + items.length) % items.length;
  const it = items[idx];
  lbImg.src = it.src;
  lbImg.alt = it.title || "";
  lbTitle.textContent = it.title || "";
  lbCaption.textContent = it.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  preloadAround(idx);

  // この画像の閲覧計測を開始
  startImageViewTracking(idx);
}


function closeLB(){
  // 最後に見ていた画像の閲覧時間を確定
  stopImageViewTracking();

  lb.hidden = true;
  document.body.style.overflow = "";
  idx = -1;
}


function move(delta){
  if(idx < 0) return;
  openLB(idx + delta);
}

function preloadAround(i){
  [i-1, i+1].forEach(k=>{
    const j = (k + items.length) % items.length;
    const img = new Image();
    img.src = items[j].src;
  });
}

// Card click / Enter key
gallery.addEventListener("click", (e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLB(parseInt(card.dataset.i,10));
});
gallery.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " "){
    const card = e.target.closest(".card");
    if(card){ e.preventDefault(); openLB(parseInt(card.dataset.i,10)); }
  }
});

// Lightbox controls
btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));

// Click on image: decide left/right half
lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  const mid = rect.left + rect.width/2;
  if(e.clientX < mid) move(-1); else move(1);
});

// Keyboard navigation
document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

// Swipe (basic)
let sx = null;
lb.addEventListener("pointerdown", (e)=>{
  if(e.pointerType === "mouse") return; // touch only
  sx = e.clientX;
  lb.setPointerCapture(e.pointerId);
});
lb.addEventListener("pointerup", (e)=>{
  if(sx == null) return;
  const dx = e.clientX - sx;
  if(Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
  sx = null;
});
