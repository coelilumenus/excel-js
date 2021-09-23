import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';

    this.prepare();
  }

  prepare() {}

  // Return compontent's template
  getTemplate() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  remove() {
    this.removeDOMListeners();
  }
}
