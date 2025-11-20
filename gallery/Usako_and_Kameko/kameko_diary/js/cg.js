// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定
const items = [
  { src: './images/1.webp', title: 'Morning of Pressed Leaves',
    caption: 'A faint color falls onto her fingertips as she checks each tag. The morning task before the jars carries a gentle sense of completion.' },

  { src: './images/2.webp', title: 'Moonlit Window',
    caption: 'With her fingers resting on the scarf, she lifts her gaze toward the night sky. Moonlight fills the window, breathing depth into the silence.' },

  { src: './images/3.webp', title: 'A Page Half Written',
    caption: 'Her brush pauses above the unfinished words. Shadows from the stacked books stretch quietly across the open notebook.' },

  { src: './images/4.webp', title: 'Shelves of Night',
    caption: 'The night outside settles softly onto her fingertips as she closes the lid. The jars reflect the faint glimmer of the sleeping seeds within.' },

  { src: './images/5.webp', title: 'Room of Lamps and Maps',
    caption: 'A lamp lights the desk where the map is spread. The paper’s ridges rise gently, revealing a quiet path beneath the glow.' },

  { src: './images/6.webp', title: 'The Shared Worktable',
    caption: 'She watches closely beside her mother’s hands as the brush begins to move. Warm light leaves a gentle temperature between the two of them.' },

  { src: './images/7.webp', title: 'An Afternoon Doze',
    caption: 'Her breath deepens as she drifts off with her face near the book. A cup still holding warmth supports the quiet flow of the afternoon.' },

  { src: './images/8.webp', title: 'Autumn Mixing Desk',
    caption: 'She organizes her notes while watching the changing colors outside. Wooden tools absorb the soft presence of autumn.' },

  { src: './images/9.webp', title: 'In the Corner of the Library',
    caption: 'She pauses with the book open. Light through the shoji gently reveals the outline of each character.' },

  { src: './images/10.webp', title: 'Between the Bookshelves',
    caption: 'She glances back while walking between the rows of spines. Her red scarf sways, slicing lightly through the air.' },

  { src: './images/11.webp', title: 'Desk of Sunlit Leaves',
    caption: 'The breeze from outside stirs the page gently. Shadows of the trees draw light patterns across the paper.' },

  { src: './images/12.webp', title: 'Lamplight and Paper',
    caption: 'Tracing the manuscript with her fingertips, the paper gives a soft sound. Night light deepens the atmosphere around her hands.' },

  { src: './images/13.webp', title: 'The Map Room',
    caption: 'She follows the lines of the wall-mounted map. Candlelight shifts slowly, changing the expression of the old paper.' },

  { src: './images/14.webp', title: 'Desk in Leaf-Shadow',
    caption: 'Her gaze pauses on the open book. Ivy sways by the window, casting faint shadows in the afternoon air.' },

  { src: './images/15.webp', title: 'Shelf of Shimmering Bottles',
    caption: 'When she touches a bottle, its inner color flickers softly. The small glow spreads a quiet aftertone across the room.' },

  { src: './images/16.webp', title: 'Holding Books at Dusk',
    caption: 'The weight of the books warms her arms. Evening light gently brings out the scent of the wooden shelves.' },

  { src: './images/17.webp', title: 'Looking Over the Forest',
    caption: 'She sets down her notebook and looks toward the greenery. The morning wind stirs the leaves, preparing the rhythm of the new day.' },

  { src: './images/18.webp', title: 'In Front of the Glass Cabinet',
    caption: 'Each time she checks a label, sunlight reflects and creates soft colors. A calm warmth fills the room little by little.' },

  { src: './images/19.webp', title: 'Morning Record Book',
    caption: 'She writes quietly in the open notebook. A cup of steaming tea gently supports the beginning of her morning.' },

  { src: './images/20.webp', title: 'Library Hall of the Forest',
    caption: 'She walks slowly down the corridor where patterns of light stretch across the floor. A small slip of paper on the shelf gleams softly in the stillness.' },

  { src: './images/21.webp', title: 'Mixing Table of Small Bottles',
    caption: 'Tilting a small bottle, she examines the color. The herbs and tools neatly arranged signal the quiet start of the day’s work.' }
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

function openLB(i){
  idx = (i + items.length) % items.length;
  const it = items[idx];
  lbImg.src = it.src;
  lbImg.alt = it.title || "";
  lbTitle.textContent = it.title || "";
  lbCaption.textContent = it.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  preloadAround(idx);
}

function closeLB(){
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
