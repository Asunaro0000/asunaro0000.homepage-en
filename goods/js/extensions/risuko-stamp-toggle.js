// risuko-stamp-toggle.js
// Show/Hide toggle between two Risuko stamp widgets without reloading external JS.
// Assumes both widgets exist in the DOM with the following IDs:
//  A-side: #risuko-stamp (and its inner elements)
//  B-side: #risuko-stamp-2 (and its inner elements)
// And two control buttons: #prevMode / #nextMode
// Optional: persists last mode using localStorage ('risukoMode' = 'A' | 'B').

(function(){
  function qs(id){ return document.getElementById(id); }

  function ready(fn){
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function(){
    var a = qs('risuko-stamp');
    var b = qs('risuko-stamp-2');
    var prev = qs('prevMode');
    var next = qs('nextMode');

    if (!a || !b){ return; } // Nothing to do if the widgets are missing

    function setVisible(el, yes){
      if (!el) return;
      if (yes){
        el.classList.remove('is-hidden');
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.classList.add('is-hidden');
        el.setAttribute('aria-hidden', 'true');
      }
    }

    function currentFromStorage(){
      try { return localStorage.getItem('risukoMode') === 'B' ? 'B' : 'A'; }
      catch(_) { return 'A'; }
    }
    function saveCurrent(v){
      try { localStorage.setItem('risukoMode', v); } catch(_) {}
    }

    var isA = currentFromStorage() !== 'B'; // default A
    function showA(){ setVisible(a, true); setVisible(b, false); isA = true; saveCurrent('A'); }
    function showB(){ setVisible(a, false); setVisible(b, true); isA = false; saveCurrent('B'); }
    function toggle(){ isA ? showB() : showA(); }

    // Wire up controls (if present)
    if (prev) prev.addEventListener('click', toggle);
    if (next) next.addEventListener('click', toggle);

    // Keyboard support (optional): Left/Right arrows to toggle
    document.addEventListener('keydown', function(e){
      if (e.defaultPrevented) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight'){ toggle(); }
    });

    // Initial state
    isA ? showA() : showB();
  });
})();
