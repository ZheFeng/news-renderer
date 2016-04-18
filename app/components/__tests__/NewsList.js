jest.unmock('../NewsList');
jest.unmock('../../utilities/dom');
jest.unmock('../NewsItem');
jest.unmock('../../utilities/componentRender');

import NewsList from '../NewsList';

describe('NewsList', () => {
  it('should render a div as the root', () => {
    const prop = {
      list: [{ body: 123, title: 222, img: 333 }],
      loading: false,
      query: {},
    };
    const detail = new NewsList(prop);
    const node = detail.render();

    expect(node.node.constructor.name).toBe('HTMLDivElement');
    expect(node.node.lastChild.constructor.name).toBe('HTMLUListElement');
  });
  it('should render spin when loading', () => {
    const prop = {
      list: [{ body: 123, title: 222, img: 333 }],
      loading: true,
      query: {},
    };
    const detail = new NewsList(prop);
    const node = detail.render();

    expect(node.node.constructor.name).toBe('HTMLDivElement');
    expect(node.node.lastChild.constructor.name).toBe('HTMLDivElement');
  });
  it('should not call props callback when disable goPre', () => {
    let onClickIndicator = null;
    const list = [{ body: 123, title: 222, img: 333 }];
    const detail = new NewsList({
      onPreClick: () => { onClickIndicator = list; },
      list,
      query: {},
      disablePre: true,
    });
    detail.goPre({});
    expect(onClickIndicator).toBe(null);
  });
  it('should call props callback when change orderBy', () => {
    let onClickIndicator = null;
    const list = [{ body: 123, title: 222, img: 333 }];
    const detail = new NewsList({
      onQueryChange: ({ orderBy }) => { onClickIndicator = orderBy; },
      list,
      query: {},
      disableNext: true,
    });
    detail.changeOrderBy({ target: { value: 'test' } });
    expect(onClickIndicator).toBe('test');
  });
  it('should call props callback when change search', () => {
    let onClickIndicator = null;
    const list = [{ body: 123, title: 222, img: 333 }];
    const detail = new NewsList({
      onQueryChange: ({ search }) => { onClickIndicator = search; },
      list,
      query: {},
      disableNext: true,
    });
    detail.changeSearch({ target: { value: 'test' } });
    expect(onClickIndicator).toBe('test');
  });
  it('should call props callback when change OrderDesc', () => {
    let onClickIndicator = null;
    const list = [{ body: 123, title: 222, img: 333 }];
    const detail = new NewsList({
      onQueryChange: ({ orderDesc }) => { onClickIndicator = orderDesc; },
      list,
      query: { orderDesc: true },
    });
    detail.changeOrderDesc();
    expect(onClickIndicator).toBe(false);
  });
  it('should not call props callback when disable goNext', () => {
    let onClickIndicator = null;
    const list = [{ body: 123, title: 222, img: 333 }];
    const detail = new NewsList({
      onNextClick: () => { onClickIndicator = list; },
      list,
      query: {},
      disableNext: true,
    });
    detail.goNext({});
    expect(onClickIndicator).toBe(null);
  });
  it('should call props callback when call goPre', () => {
    let onClickIndicator = {};
    const list = [{ body: 123, title: 222, img: 333 }];
    const detail = new NewsList({
      onPreClick: () => { onClickIndicator = list; },
      list,
      query: {},
    });
    detail.goPre({});
    expect(onClickIndicator).toBe(list);
  });
  it('should call props callback when call goNext', () => {
    let onClickIndicator = {};
    const list = [{ body: 123, title: 222, img: 333 }];
    const detail = new NewsList({
      onNextClick: () => { onClickIndicator = list; },
      list,
      query: {},
    });
    detail.goNext({});
    expect(onClickIndicator).toBe(list);
  });
  it('should call props callback when call changeNumberPerPage', () => {
    let onClickIndicator = {};
    const list = [{ body: 123, title: 222, img: 333 }];
    const detail = new NewsList({
      onQueryChange: () => { onClickIndicator = list; },
      list,
      query: {},
    });
    detail.changeNumberPerPage({ target: { value: 123 } });
    expect(onClickIndicator).toBe(list);
  });
});
