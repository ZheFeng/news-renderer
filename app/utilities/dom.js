

class Dom {
  constructor(tag) {
    if (typeof tag === 'string') {
      this.node = document.createElement(tag);
    } else {
      this.node = tag;
    }
  }
  empty() {
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
    return this;
  }
  append(dom) {
    this.node.appendChild(dom.node);
    return this;
  }
  setClass(classNames) {
    this.node.className = classNames;
    return this;
  }
  setAttr(key, val) {
    this.node.setAttribute(key, val);
    return this;
  }
  innerHTML(inner) {
    this.node.innerHTML = inner;
    return this;
  }
  on(event, handler) {
    this.node.addEventListener(event, handler);
    return this;
  }
}


/**
 * createDom - create a dom wrapper with a given html tag
 *
 * @param  {string} tag html tag name
 * @return {dom wrapper}     dom wrapper
 */
export function createDom(tag) {
  return new Dom(tag);
}

/**
 * getDom - find a dom by id and creat wrapper
 *
 * @param  {string} id html dom id
 * @return {dom wrapper}     dom wrapper
 */
export function getDom(id) {
  return new Dom(document.getElementById(id));
}

/**
 * wrapDom - wrap an exist dom into dom wrapper
 *
 * @param  {dom} node an exist dom node
 * @return {dom wrapper}     dom wrapper
 */
export function wrapDom(node) {
  return createDom(node);
}
