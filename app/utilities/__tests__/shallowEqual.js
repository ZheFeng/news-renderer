jest.unmock('../shallowEqual');

import shallowEqual from '../shallowEqual';

describe('shallowEqual', () => {
  it('1 should equal to 1', () => {
    expect(shallowEqual(1, 1)).toBe(true);
  });
  it('objA should equal to objB', () => {
    const objA = {
      a: 1,
      b: {
        data: 123,
        id: '1234SDF',
      },
    };
    const objB = {
      ...objA,
      a: 1,
    };
    expect(shallowEqual(objA, objB)).toBe(true);
  });
  it('objA should not equal to objB', () => {
    const objA = {
      a: 1,
      b: {
        data: 123,
        id: '1234SDF',
      },
    };
    const objB = {
      ...objA,
      a: 2,
    };
    expect(shallowEqual(objA, objB)).toBe(false);
  });
});
