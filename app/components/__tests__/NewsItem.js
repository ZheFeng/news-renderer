jest.unmock('../NewsItem');
jest.unmock('../../utilities/dom');

import NewsItem from '../NewsItem';

describe('NewsItem', () => {
  it('should render a div as the root', () => {
    const data = { body: 123, title: 222, img: 333 };
    const detail = new NewsItem({ data });
    const node = detail.render();
    expect(node.node.constructor.name).toBe('HTMLDivElement');
  });
  it('should call props callback when call onBackClick', () => {
    let onClickIndicator = {};
    const data = { body: 123, title: 222, img: 333 };
    const detail = new NewsItem({
      onClick: (e, d) => { onClickIndicator = d; },
      data,
    });
    detail.onClick({});
    expect(onClickIndicator.body).toBe(data.body);
  });
});
