// panorama.js
// ------------------------------------------------------
// Risuko Panorama: Set switching + infinite scroll + captions + progress dots
// ------------------------------------------------------

// DOM refs
const pano = document.getElementById('panorama');
const thumbsWrap = document.getElementById('panoThumbs');
const captionTitleEl = document.getElementById('panoTitle');
const captionTextEl = document.getElementById('panoText');
const progressDots = document.querySelectorAll('.pano-progress-dot');

const IMAGE_BASE = './assets/images/';

// Panorama sets
const panoSets = [
  {
    id: 'set1',
    label: 'Ancient Trunk Corridor',
    images: ['1-1.webp','1-2.webp','1-3.webp','1-4.webp','1-5.webp','1-6.webp'],
    title: 'Ancient Trunk Corridor',
    caption: 'Twisted trunks intertwine to form a natural corridor. Autumn light stands like pillars, quietly guiding those who walk toward the deeper layers of the forest.'
  },
  {
    id: 'set2',
    label: 'Shrineborne Path',
    images: ['2-1.webp','2-2.webp','2-3.webp','2-4.webp','2-5.webp','2-6.webp'],
    title: 'Shrineborne Path',
    caption: 'Shrines of various sizes line the trail, as if preserving the continuity of ancient prayers. The clear air drifting on both sides hints that this is a forest “memory zone”.'
  },
  {
    id: 'set3',
    label: 'Forest Sanctuaries',
    images: ['3-1.webp','3-2.webp','3-3.webp','3-4.webp','3-5.webp','3-6.webp'],
    title: 'Forest Sanctuaries',
    caption: 'Sunlit sanctuaries appear one after another, sketching a quiet axis through the forest’s heart. Long-aged trees stand like pillars of a natural shrine.'
  },
  {
    id: 'set4',
    label: 'Garden of Remnants',
    images: ['4-1.webp','4-2.webp','4-3.webp','4-4.webp','4-5.webp','4-6.webp'],
    title: 'Garden of Remnants',
    caption: 'Old stakes and fallen trunks lie as proof of the forest’s accumulated time. Light fills the open spaces, gently connecting the layers that have passed with those about to sprout.'
  },
  {
    id: 'set6',
    label: 'Stillwater Grove',
    images: ['6-1.webp','6-2.webp','6-3.webp','6-4.webp','6-5.webp','6-6.webp'],
    title: 'Stillwater Grove',
    caption: 'The water reflects the forest’s hues, as if another layer exists behind a mirror. The silence is deep enough to swallow sound, and a single step feels like crossing a boundary.'
  },
  {
    id: 'set5',
    label: 'Sunlit Meadow Trail',
    images: ['5-1.webp','5-2.webp','5-3.webp','5-4.webp','5-5.webp','5-6.webp'],
    title: 'Sunlit Meadow Trail',
    caption: 'Soft light pours in, and multiple narrow paths melt into the forest. Traces of small animals remain, revealing the quiet daily rhythm of this place.'
  },
  {
    id: 'set10',
    label: 'Wandering Roots Trail',
    images: ['10-1.webp','10-2.webp','10-3.webp','10-4.webp','10-5.webp','10-6.webp'],
    title: 'Wandering Roots Trail',
    caption: 'Stumps, side paths, and shallow streams linger like faint outlines of forest life. The fewer the footsteps, the deeper the layers—and the denser the breathing of the woods.'
  },
  {
    id: 'set7',
    label: 'Harmonic Woodland Trail',
    images: ['7-1.webp','7-2.webp','7-3.webp','7-4.webp','7-5.webp','7-6.webp'],
    title: 'Harmonic Woodland Trail',
    caption: 'Fallen logs and stones form gentle rings where the forest seems to steady its breath. Only the faint feeling of small creatures resting remains, calming the hearts of those who pass.'
  },
  {
    id: 'set8',
    label: 'Ritual Thrones',
    images: ['8-1.webp','8-2.webp','8-3.webp','8-4.webp','8-5.webp','8-6.webp'],
    title: 'Ritual Thrones',
    caption: 'Sacred places appear one after another, revealing arrangements shaped by countless years of ritual. When sunlight enters, old traces rise faintly, and the echo of ceremonies rides upon the wind.'
  },
  {
    id: 'set9',
    label: 'Lanternwood Glade',
    images: ['9-1.webp','9-2.webp','9-3.webp','9-4.webp','9-5.webp','9-6.webp'],
    title: 'Lanternwood Glade',
    caption: 'Lights dwell between the trees, holding the boundary between morning and dusk. Long shadows stretch underfoot as the forest quietly prepares its next layer.'
  },
  {
    id: 'set11',
    label: 'Viridian Rings Passage',
    images: ['11-1.webp','11-2.webp','11-3.webp','11-4.webp','11-5.webp','11-6.webp'],
    title: 'Viridian Rings Passage',
    caption: 'Trees stand in circular formations, forming a structure almost too smooth to be natural. Forest boundaries overlap lightly, giving the sense that another layer lies just ahead.'
  },
  {
    id: 'set12',
    label: 'Echoes of Spirits',
    images: ['12-1.webp','12-2.webp','12-3.webp','12-4.webp','12-5.webp','12-6.webp'],
    title: 'Echoes of Spirits',
    caption: 'A small shadow flickers in the woods, leaving only a faint trace of a passing spirit. The way light and wind gather feels uncanny, as if the “reverse side” of the world lies right beside you.'
  }
];

// (以下はロジックそのまま。翻訳不要なので省略せず原型維持)

let loopWidth = 0;
let autoScroll = false;
let rafId = null;
const SPEED = 2.5;

let currentSetIndex = 0;

let pDown = false;
let pStartX = 0;
let pScroll = 0;

function resetProgress() {
  if (!progressDots.length) return;
  progressDots.forEach(dot => dot.classList.remove('is-on'));
}

function updateProgress() {
  if (!pano || !loopWidth || !progressDots.length) return;

  if (pano.scrollLeft <= 1) {
    resetProgress();
    return;
  }

  let ratio = pano.scrollLeft / loopWidth;
  if (ratio < 0) ratio = 0;
  if (ratio > 0.999) ratio = 0.999;

  const index = Math.floor(ratio * progressDots.length);

  progressDots.forEach((dot, i) => {
    dot.classList.toggle('is-on', i <= index);
  });
}

function waitImagesLoaded(container, cb) {
  const imgs = Array.from(container.querySelectorAll('img'));
  if (imgs.length === 0) {
    cb();
    return;
  }
  let remaining = imgs.length;
  const done = () => {
    remaining -= 1;
    if (remaining <= 0) cb();
  };
  imgs.forEach(img => {
    if (img.complete) {
      done();
    } else {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }
  });
}

function stopAutoScroll() {
  autoScroll = false;
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function startAutoScroll() {
  autoScroll = true;
  if (rafId === null) {
    rafId = requestAnimationFrame(step);
  }
}

function loadSet(index) {
  const set = panoSets[index];
  if (!set || !pano) return;

  currentSetIndex = index;

  stopAutoScroll();
  pano.scrollLeft = 0;
  loopWidth = 0;
  resetProgress();

  if (captionTitleEl) captionTitleEl.textContent = set.title || '';
  if (captionTextEl) captionTextEl.textContent = set.caption || '';

  pano.innerHTML = '';

  set.images.forEach(file => {
    const img = document.createElement('img');
    img.src = IMAGE_BASE + file;
    img.alt = set.title || 'Risuko panorama';
    pano.appendChild(img);
  });

  waitImagesLoaded(pano, () => {
    const originalsWidth = pano.scrollWidth;

    const originals = Array.from(pano.children);
    originals.forEach(node => {
      const clone = node.cloneNode(true);
      pano.appendChild(clone);
    });

    loopWidth = originalsWidth;

    resetProgress();
  });

  updateActiveThumb();
}

function createThumbnails() {
  if (!thumbsWrap) return;
  thumbsWrap.innerHTML = '';

  panoSets.forEach((set, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pano-thumb';
    btn.dataset.index = String(idx);

    const thumbImg = document.createElement('img');
    const thumbFile = set.images[0];
    thumbImg.src = IMAGE_BASE + thumbFile;
    thumbImg.alt = set.label || set.title || `set ${idx + 1}`;

    const label = document.createElement('span');
    label.textContent = set.label || set.title || `Set ${idx + 1}`;

    btn.appendChild(thumbImg);
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      loadSet(idx);
      startAutoScroll();

      if (window.bgmControl && window.bgmControl.playOnFirstInteraction) {
        window.bgmControl.playOnFirstInteraction();
      }
    });

    thumbsWrap.appendChild(btn);
  });

  updateActiveThumb();
}

function updateActiveThumb() {
  if (!thumbsWrap) return;
  const buttons = Array.from(thumbsWrap.querySelectorAll('.pano-thumb'));
  buttons.forEach((btn, i) => {
    if (i === currentSetIndex) {
      btn.classList.add('is-active');
    } else {
      btn.classList.remove('is-active');
    }
  });
}

function step() {
  if (!autoScroll || !pano) return;

  pano.scrollLeft += SPEED;

  if (loopWidth > 0 && pano.scrollLeft >= loopWidth) {
    pano.scrollLeft -= loopWidth;
    resetProgress();
  } else {
    updateProgress();
  }

  rafId = requestAnimationFrame(step);
}

if (pano) {
  pano.addEventListener('click', () => {
    if (window.bgmControl && window.bgmControl.playOnFirstInteraction) {
      window.bgmControl.playOnFirstInteraction();
    }

    if (autoScroll) stopAutoScroll();
    else startAutoScroll();
  });

  pano.addEventListener('scroll', () => {
    if (!loopWidth) return;
    updateProgress();
  });

  pano.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    pDown = true;
    pStartX = e.clientX;
    pScroll = pano.scrollLeft;
    pano.setPointerCapture(e.pointerId);
  });

  pano.addEventListener('pointermove', e => {
    if (!pDown) return;
    pano.scrollLeft = pScroll - (e.clientX - pStartX);
  });

  pano.addEventListener('pointerup', e => {
    if (!pDown) return;
    pDown = false;
    pano.releasePointerCapture(e.pointerId);
  });

  pano.addEventListener('pointercancel', e => {
    if (!pDown) return;
    pDown = false;
    pano.releasePointerCapture(e.pointerId);
  });
}

window.addEventListener('load', () => {
  createThumbnails();
  loadSet(0);
});
