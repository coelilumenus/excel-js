import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

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

  // initialization of component (add dom-listeners)
  init() {
    this.initDOMListeners();
  }

  // delete component, clear listeners
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
