// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定
const items = [
  { src: './images/1.webp',  title: 'In the Filtered Sunlight',
    caption: 'She shields her eyes from the warm rays and leans against the tree, quietly steadying her breath in the soft brightness.' },

  { src: './images/2.webp',  title: 'Looking Up at the Sky',
    caption: 'When she gazes at the rising clouds, the wind runs across the field. The red ribbon catches the breeze and flutters lightly.' },

  { src: './images/3.webp',  title: 'Nest of Little Birds',
    caption: 'A tiny chick nestles close to her hands. Afternoon light pours into the basket, filling it with gentle warmth.' },

  { src: './images/4.webp',  title: 'Owl of the Forest',
    caption: 'The owl perches softly on her outstretched hand. Morning light highlights each feather, revealing its delicate patterns.' },

  { src: './images/5.webp',  title: 'Rabbits of the Meadow',
    caption: 'As she sits in the field, small rabbits gather around her. The scent of the grass spreads quietly through her chest.' },

  { src: './images/6.webp',  title: 'Evening Path',
    caption: 'She walks slowly along the golden road. The slanting light nudges her forward, tinting the distant sky with warm color.' },

  { src: './images/7.webp',  title: 'Resting on the Grass',
    caption: 'Lying on the grass, she feels the ground’s warmth gently rise. Afternoon calm fills the air without making a sound.' },

  { src: './images/8.webp',  title: 'Listening to the Forest Wind',
    caption: 'With her eyes closed, the subtle touch of branches reaches her ears. The whole forest whispers softly beside her.' },

  { src: './images/9.webp',  title: 'Holding a Kitten',
    caption: 'Morning light fills the room as she pulls the kitten close. Its faint warmth gently colors the quiet moment.' },

  { src: './images/10.webp', title: 'Looking Toward the Sunset',
    caption: 'She lies on the grass, eyes lifted to the sky. The fading sun paints her closed eyelids in a soft glow.' },

  { src: './images/11.webp', title: 'Autumn on the Veranda',
    caption: 'Her hands pause as she gathers fallen leaves. The colors of autumn blend with the light, carrying the scent of the season.' },

  { src: './images/12.webp', title: 'From the Forest’s Shade',
    caption: 'A squirrel appears at her feet as she steps out from the shadow of the trees. The bright forest gently outlines its small movements.' },

  { src: './images/13.webp', title: 'Under the Cherry Blossoms',
    caption: 'Walking beneath the rows of trees, a petal falls on her shoulder. With a single touch, spring draws quietly closer.' },

  { src: './images/14.webp', title: 'Paper Plane to the Sky',
    caption: 'The paper plane catches the wind. Its white wings reflect the morning light as it rises toward the sky.' },

  { src: './images/15.webp', title: 'Lighting the Lantern',
    caption: 'She lifts a small lantern, gathering a warm orange glow in her hands. The mountain’s calm signals the beginning of night.' },

  { src: './images/16.webp', title: 'Little Birds on the Veranda',
    caption: 'Sitting on the veranda, she offers food to the small birds. Their fluttering wings let morning gently begin to move.' },

  { src: './images/17.webp', title: 'To the Forest Fox',
    caption: 'She sits in their usual forest spot and holds out a bowl. The fox approaches with calm steps, wrapped in a familiar silence.' },

  { src: './images/18.webp', title: 'Morning Preparations',
    caption: 'As she stirs the pot, the steam rises softly. Its fragrance spreads, quietly announcing the start of a new morning.' },

  { src: './images/19.webp', title: 'Sheltered from the Rain',
    caption: 'Under the sound of falling rain, she pauses beside a tree. A drop slides from a leaf onto her shoulder, cool against her skin.' },

  { src: './images/20.webp', title: 'Morning Wings Toward the Sky',
    caption: 'A small bird trembles its wings, catching the light. The gentle glow overlaps with the delicate feeling of morning.' },

  { src: './images/21.webp', title: 'Reunion in the Forest',
    caption: 'The fox settles into her arms with its eyes closed. Usako opens her eyes, quietly watching over the peaceful moment.' },

  { src: './images/22.webp', title: 'Walking the Bamboo Path',
    caption: 'Descending the bamboo steps, the scent of green rises at her feet. Light carries the quiet hint of a new season.' },

  { src: './images/23.webp', title: 'Through the Bamboo Grove',
    caption: 'Each step through the grove rustles the leaves. Soft shadows fall at her feet as the tranquil morning continues.' },

  { src: './images/24.webp', title: 'At the Heart of the Flower Field',
    caption: 'Standing at the center of the flowers, she gently brings her hands together. Her floral crown catches the light, sparkling as the breeze unravels it.' },
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
