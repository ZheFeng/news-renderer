jest.unmock('../componentRender');

import componentRender from '../componentRender';

class SampleComp {
  constructor(props) {
    this.props = props;
  }
  render() {
    return this.props;
  }
}

describe('componentRender', () => {
  it('should create instance with props and has render function', () => {
    const rendered = componentRender(SampleComp, { test: 123 });
    expect(rendered.test).toBe(123);
  });
});
