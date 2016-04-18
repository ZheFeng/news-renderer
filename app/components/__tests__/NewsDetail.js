jest.unmock('../NewsDetail');
jest.unmock('../../utilities/dom');

import NewsDetail from '../NewsDetail';

describe('NewsDetail', () => {
  it('should render a div as the root', () => {
    const data = { body: 123, title: 222, img: 333 };
    const detail = new NewsDetail({ data });
    const node = detail.render();
    expect(node.node.constructor.name).toBe('HTMLDivElement');
  });
  it('should call props callback when call onBackClick', () => {
    let onClickIndicator = {};
    const data = { body: 123, title: 222, img: 333 };
    const detail = new NewsDetail({
      onClick: (e, d) => { onClickIndicator = d; },
      data,
    });
    detail.onBackClick({});
    expect(onClickIndicator.body).toBe(data.body);
  });
});
