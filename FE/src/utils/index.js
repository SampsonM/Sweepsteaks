export function injectInitialState(state) {
  const script = document.createElement('script');
  script.innerHTML = `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`;
  document.head.appendChild(script);
}

export function registerStoreModule({ module, name, store }) {
  const moduleIsRegistered = store._modules.root._children[name] !== undefined;
  const preserveState = store.state[name] !== undefined;

  if (!moduleIsRegistered) store.registerModule(name, module, { preserveState });
}


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {37: 1, 38: 1, 39: 1, 40: 1}

function preventDefault(e) {
  e = e || window.event
  if (e.preventDefault) e.preventDefault()
  e.returnValue = false
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

export function disableScroll() {
  if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', preventDefault, false)
  }
  document.addEventListener('wheel', preventDefault, {passive: false}) // Disable scrolling in Chrome
  window.onwheel = preventDefault // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
  window.ontouchmove = preventDefault // mobile
  document.onkeydown = preventDefaultForScrollKeys
}

export function enableScroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
  }
  document.removeEventListener('wheel', preventDefault, {passive: false}) // Enable scrolling in Chrome
  window.onmousewheel = document.onmousewheel = null 
  window.onwheel = null 
  window.ontouchmove = null  
  document.onkeydown = null  
}