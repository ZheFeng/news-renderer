jest.unmock('../NewsList');
jest.unmock('../NewsItem');
jest.unmock('../NewsDetail');
jest.unmock('../App');
jest.unmock('../../State');
jest.unmock('../../utilities/dom');
jest.unmock('../../utilities/componentRender');

import App from '../App';
import { createDom } from '../../utilities/dom';

describe('App', () => {
  it('should handler error', () => {
    const appContainer = createDom('div');
    const app = new App(appContainer, '/image-url');
    app.render();
    expect(app.state.get().list.length).toBe(0);

    expect(appContainer.node.firstChild.constructor.name)
      .toBe('HTMLDivElement');
    expect(appContainer.node.firstChild.firstChild.className)
      .toBe('news-list');
  });
  it('should insert div into container and init call data', () => {
    const appContainer = createDom('div');
    const app = new App(appContainer, '/image-url');
    app.render();
    expect(app.state.get().list.length).toBe(3);

    expect(appContainer.node.firstChild.constructor.name)
      .toBe('HTMLDivElement');
    expect(appContainer.node.firstChild.firstChild.className)
      .toBe('news-list');
  });
  it('should able to select or unselect item', () => {
    const appContainer = createDom('div');
    const app = new App(appContainer, '/image-url');
    app.render();
    expect(app.state.get().list.length).toBe(3);
    app.setItem({}, app.state.get().list[0]);
    expect(appContainer.node.firstChild.firstChild.className)
      .toBe('news-detail');

    app.clearItem();
    expect(appContainer.node.firstChild.firstChild.className)
      .toBe('news-list');
  });
  it('should change the Query', () => {
    const appContainer = createDom('div');
    const app = new App(appContainer, '/image-url');
    app.render();


    app.changeQuery({
      ...app,
      numberPerPage: 10,
    });
    expect(app.state.get().list.length).toBe(10);
    app.changeQuery({
      ...app,
      numberPerPage: 0,
    });
    expect(app.state.get().list.length).toBe(1);
  });
  it('should be able to go next', () => {
    const appContainer = createDom('div');
    const app = new App(appContainer, '/image-url');
    app.render();
    app.goNext();
    expect(app.state.get().list[0].id).toBe(4);
  });
  it('should be able to go pre', () => {
    const appContainer = createDom('div');
    const app = new App(appContainer, '/image-url');
    app.render();
    app.goNext();
    app.goNext();
    app.goPre();
    expect(app.state.get().list[0].id).toBe(4);
    app.goPre();
    expect(app.state.get().list[0].id).toBe(1);
    app.goPre();
    expect(app.state.get().list[0].id).toBe(1);
    expect(app.state.get().list[0].id).toBe(1);
  });
});
