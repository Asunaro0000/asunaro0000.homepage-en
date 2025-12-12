const el = {
  stage: document.getElementById('stage'),
  img: document.getElementById('img'),
  cap: document.getElementById('cap'),
  nav: document.getElementById('nav'),
  scrub: document.getElementById('scrub'),
  badge: document.getElementById('badge'),
  bottomTap: document.getElementById('bottomTap'),
  bgm: document.getElementById('bgm'),
  vol: document.getElementById('vol'),
  mute: document.getElementById('mute'),
};

let scenes = []; 
let i = 0; 
let audioPrimed = false;

// --- simple image cache for preloading ---
const cache = new Map(); // src -> HTMLImageElement
const vcache = new Map(); // src -> HTMLLinkElement (video preload)
function preload(src){
  if (!src || cache.has(src)) return;
  const im = new Image();
  im.decoding = 'async';
  im.loading = 'eager';
  im.src = src;
  cache.set(src, im);
}
function preloadVideo(src){
  if (!src || vcache.has(src)) return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as  = 'video';
  link.href = src;
  document.head.appendChild(link);
  vcache.set(src, link);
}
function preloadAround(idx){
  // 先読み: 次を強制、余力があれば次々/前も
  const nxt  = scenes[idx+1]?.src;
  const nxt2 = scenes[idx+2]?.src;
  const prev = scenes[idx-1]?.src;
  // できるだけブラウザのアイドル時間で温める
  const run = () => { preload(nxt); preload(nxt2); preload(prev); };
  (window.requestIdleCallback ? requestIdleCallback(run, {timeout: 300}) : setTimeout(run, 0));


  // 動画も同様に温める
  const vn1 = scenes[idx+1]?.isVideo ? scenes[idx+1].src : null;
  const vn2 = scenes[idx+2]?.isVideo ? scenes[idx+2].src : null;
  const vp  = scenes[idx-1]?.isVideo ? scenes[idx-1].src : null;
  const runV = () => { preloadVideo(vn1); preloadVideo(vn2); preloadVideo(vp); };
  (window.requestIdleCallback ? requestIdleCallback(runV, {timeout: 300}) : setTimeout(runV, 0));

}

async function loadScenes(){
  const res = await fetch('scenes.json'); 
  scenes = await res.json();
  el.scrub.max = String(scenes.length - 1);
  // 初期表示
  renderAt(0);
  // 初期の温め（1〜2枚目）
  preloadAround(0);
}

// ---- 画像切替アニメ（フェード＋2pxスライド） ----
let swapToken = 0;
function flashImg(){
  // 画像要素に .img-swap を当て直してアニメを発火
  if (!el.img) return;
  el.img.classList.remove('img-swap');
  // reflow
  void el.img.offsetWidth;
  el.img.classList.add('img-swap');
}

function renderAt(idx){
  i = Math.max(0, Math.min(scenes.length - 1, idx));
  const s = scenes[i];

  // 画像と動画を切り替え
  if (s.isVideo) {
    // 既存の画像を非表示
    el.img.style.display = 'none';
    // 既存動画が無ければ作成
    let vid = document.getElementById('sceneVideo');
    if (!vid) {
      vid = document.createElement('video');
      vid.id = 'sceneVideo';
      vid.playsInline = true;
      vid.autoplay = true;
      vid.muted = true;
      vid.preload = 'auto';
      // 画像と同じ枠(#imageWrap)に重ねる
      vid.style.position = 'absolute';
      vid.style.inset = '0';
      vid.style.objectFit = 'cover';        // フル拡大して余白をなくす
      vid.style.width = '100%';
      vid.style.height = '100%';
      vid.style.minWidth = '100%';
      vid.style.minHeight = '100%';
      vid.style.maxWidth = 'none';
      vid.style.maxHeight = 'none';
      (document.getElementById('imageWrap') || el.img.parentElement).appendChild(vid);
    }
    vid.src = s.src;
     el.cap.textContent = s.cap || '';    // ← キャプションを更新
     el.scrub.value = String(i);
     el.badge.textContent = `${i+1} / ${scenes.length}`;
    vid.onended = () => {
      vid.pause();
      vid.currentTime = vid.duration - 0.1; // 停止して最終フレームで静止
    };
    vid.style.display = 'block';
  } else {
    // 動画が表示中なら隠す
    const vid = document.getElementById('sceneVideo');
    if (vid) vid.style.display = 'none';
    el.img.style.display = 'block';

    // ここから下は元の画像更新ロジック
    const nextSrc = s.src;
    if (el.img.getAttribute('src') === nextSrc){
      el.cap.textContent = s.cap || '';
      el.scrub.value = String(i);
      el.badge.textContent = `${i+1} / ${scenes.length}`;
      preloadAround(i);
      return;
    }
    const token = ++swapToken;
    const tmp = new Image();
    tmp.decoding = 'async';
    tmp.loading  = 'eager';
    tmp.src = nextSrc;
    const apply = () => {
      if (token !== swapToken) return;
      el.img.src = nextSrc;
      el.cap.textContent = s.cap || '';
      el.scrub.value = String(i);
      el.badge.textContent = `${i+1} / ${scenes.length}`;
      flashImg();
      preloadAround(i);
    };
    if ('decode' in tmp && typeof tmp.decode === 'function'){
      tmp.decode().catch(()=>{}).finally(apply);
    } else {
      tmp.onload = apply;
      tmp.onerror = apply;
    }
  }
}


function show(delta){ renderAt(i + delta); }
function openNav(){ el.nav.classList.add('is-open'); }
function closeNav(){ el.nav.classList.remove('is-open'); }
function toggleNav(){ el.nav.classList.toggle('is-open'); }

function primeAudio(){
  if (audioPrimed) return;
  audioPrimed = true;
  el.bgm.volume = parseFloat(el.vol?.value || '0.8');
  el.bgm.play().catch(()=>{});
}

// events
// 下部タップは「開く専用」。開いている時は何もしない
el.bottomTap.addEventListener('click', ()=>{ 
  if (!el.nav.classList.contains('is-open')) {
    openNav(); 
    // ナビ開中は bottomTap が干渉しないようにする
    el.bottomTap.style.pointerEvents = 'none';
    primeAudio();
  }
});

// ナビ内でのクリック/タッチは外へ伝播させない（誤閉じ防止）
['click','pointerdown','touchstart'].forEach(type=>{
  el.nav.addEventListener(type, ev=>{
    ev.stopPropagation();
  }, {passive:true});
});

el.scrub.addEventListener('input', e=> renderAt(parseInt(e.target.value||'0')));
// スライダー操作時は伝播を止めて誤動作防止
['pointerdown','touchstart','click'].forEach(type=>{
  el.scrub.addEventListener(type, ev=>ev.stopPropagation(), {passive:true});
});

// 追加の保険：ナビ内クリックの伝播停止
['click','pointerdown','touchstart'].forEach(type=>{
  el.nav.addEventListener(type, ev=>ev.stopPropagation(), {passive:true});
});

el.mute.addEventListener('click', ()=>{
  const pressed = el.mute.getAttribute('aria-pressed') === 'true';
  const next = !pressed;
  el.mute.setAttribute('aria-pressed', String(next));
  el.bgm.muted = next;
  el.mute.textContent = next ? '🔇' : '🔊';
});

el.vol?.addEventListener('input', ()=> el.bgm.volume = parseFloat(el.vol.value || '0.8'));

// Left/right click when nav closed
el.stage.addEventListener('click', (e)=>{
   primeAudio();
  if (el.nav.classList.contains('is-open')){
    // ナビが開いている場合：ナビ外（上側）をクリックした時だけ閉じる
    const navTop = window.innerHeight - el.nav.offsetHeight;
    if (e.clientY < navTop) {
      closeNav();
      // 再び bottomTap を有効化
      el.bottomTap.style.pointerEvents = 'auto';
    }
    return;
  }
  (e.clientX < window.innerWidth*0.5) ? show(-1) : show(+1);
});

// Keyboard
document.addEventListener('keydown', (e)=>{
  if (e.key === 'ArrowRight' || e.key === ' ') show(+1);
  if (e.key === 'ArrowLeft') show(-1);
  if (e.key.toLowerCase() === 'd') { openNav(); primeAudio(); }
  if (e.key.toLowerCase() === 's' || e.key === 'Escape') closeNav();
});

loadScenes();



document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.nav');
  const toggleBtn = document.getElementById('headerToggle');
  if (!header || !toggleBtn) return;

  let hidden = false;

  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();   // 他のクリック処理に干渉しない
    hidden = !hidden;

    if (hidden) {
      header.classList.add('is-hidden');
      toggleBtn.textContent = 'ヘッダーを表示';
    } else {
      header.classList.remove('is-hidden');
      toggleBtn.textContent = 'ヘッダーを隠す';
    }
  });
});
