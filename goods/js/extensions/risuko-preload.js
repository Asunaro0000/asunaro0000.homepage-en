// risuko-preload.js
// 既にあれば再定義しない（多重ロード対策）
window.__preloaded = window.__preloaded || new Map();

window.preloadName = window.preloadName || function(list, i, basePath, ext){
  const j = (i + list.length) % list.length;
  const name = list[j];
  if (!name) return;

  // nameに拡張子が含まれていれば ext を二重付与しない
  const hasExt = /\.\w{3,4}$/.test(name);
  const url = (basePath || "") + encodeURIComponent(name) + (hasExt ? "" : (ext || ""));

  if (window.__preloaded.has(url)) return;
  const im = new Image();
  im.decoding = "async";
  im.loading = "eager";
  im.src = url;
  window.__preloaded.set(url, im);
};

window.preloadAround = window.preloadAround || function(list, idx, basePath, ext){
  if (!Array.isArray(list) || !list.length) return;
  [0,1,-1,2,-2].forEach(k => window.preloadName(list, idx + k, basePath, ext));
};
