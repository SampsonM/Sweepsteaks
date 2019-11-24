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
