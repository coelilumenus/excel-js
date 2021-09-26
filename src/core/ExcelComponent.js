import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.store = options.store;
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.storeSub = null;

    this.prepare();
  }

  // give settings to component before initial
  prepare() {}

  // Return compontent's template
  getTemplate() {
    return '';
  }

  // Emit subscribers about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Subscribe to event
  $on(event, callback) {
    const unsub = this.emitter.subscribe(event, callback);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(callback) {
    this.storeSub = this.store.subscribe(callback);
  }

  // initialization of component (add dom-listeners)
  init() {
    this.initDOMListeners();
  }

  // delete component, clear listeners
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
