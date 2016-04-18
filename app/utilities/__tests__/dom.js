jest.unmock('../dom');

import { createDom, getDom, wrapDom } from '../dom';

describe('dom', () => {
  it('should create dom with a node attr', () => {
    const dom = createDom({ test: 123 });
    expect(dom.node.test).toBe(123);
  });
  it('should has empty func', () => {
    const dom = createDom({ test: 123 });
    expect(dom.empty().node).toBe(dom.node);
  });
  it('should has append func', () => {
    const node = {
      appendChild: (child) => {
        node.child = child;
      },
    };
    const dom = createDom(node);
    expect(dom.append({ node: { newNode: true } }).node.child.newNode)
      .toBe(true);
  });
  it('should has setClass func', () => {
    const dom = createDom({});
    expect(dom.setClass('hello').node.className).toBe('hello');
  });
  it('should has setAttr func', () => {
    const node = {
      setAttribute: (key, val) => {
        node[key] = val;
      },
    };
    const dom = createDom(node);
    expect(dom.setAttr('key', 'val').node.key).toBe('val');
  });
  it('should has innerHTML func', () => {
    const dom = createDom({});
    expect(dom.innerHTML('hello').node.innerHTML).toBe('hello');
  });
  it('should has on func', () => {
    const node = {
      addEventListener: (key, val) => {
        node[key] = val;
      },
    };
    const dom = createDom(node);
    expect(dom.on('key', 'val').node.key).toBe('val');
  });
  it('should create dom with a node attr', () => {
    const dom = getDom('nothing');
    expect(dom.node).toBe(null);
  });
  it('should wrapDom dom same with createDom', () => {
    const dom = wrapDom({ test: 123 });
    expect(dom.node.test).toBe(123);
  });
});
  // on(event, handler) {
  //   this.node.addEventListener(event, handler);
  //   retu
