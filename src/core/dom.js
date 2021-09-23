class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html;
      return this;
    }

    return this.$element.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  remove() {
    this.$element.remove();
    return this;
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$element;
    }

    if (Element.prototype.append) {
      this.$element.append(node);
    } else {
      this.$element.appendChild(node);
    }
    // for chaning ability
    return this;
  }

  closest(selector) {
    return $(this.$element.closest(selector));
  }

  get data() {
    return this.$element.dataset;
  }

  getCoords() {
    return this.$element.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$element.querySelector(selector));
  }

  css(styles = {}) {
    Object
      .keys(styles)
      .forEach((key) => {
        this.$element.style[key] = styles[key];
      });
  }

  addClass(className) {
    this.$element.classList.add(className);
  }

  removeClass(className) {
    this.$element.classList.remove(className);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const element = document.createElement(tagName);

  if (classes) {
    element.classList.add(classes);
  }

  return $(element);
};
