(() => {
  let lastFocus, root, handler;
  function enableTrap(el){
    root = el;
    lastFocus = document.activeElement;
    const focusable = root ? root.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])') : [];
    if(!root || !focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    handler = (e) => {
      if(e.key !== 'Tab') return;
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault();
        last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault();
        first.focus();
      }
    };
    root.addEventListener('keydown', handler);
    first.focus();
  }
  function disableTrap(){
    if(handler && root){
      root.removeEventListener('keydown', handler);
    }
    handler = null;
    root = null;
    if(lastFocus && typeof lastFocus.focus === 'function'){
      lastFocus.focus();
    }
    lastFocus = null;
  }
  window.NA_FocusTrap = { enableTrap, disableTrap };
})();
