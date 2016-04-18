jest.unmock('../utilities/shallowEqual');
jest.unmock('../State');

import State from '../State';


describe('State', () => {
  it('should be able to get data', () => {
    const state = new State();
    expect(state.get().list.length).toBe(0);
  });
  it('should be able to set list', () => {
    const state = new State();
    state.setList([{}, {}, {}]);
    expect(state.get().list.length).toBe(3);
  });
  it('should be able to set item', () => {
    const state = new State();
    state.setItem({ test: 123 });
    expect(state.get().item.test).toBe(123);
  });
  it('should be able to set loading', () => {
    const state = new State();
    state.setListLoading(true);
    expect(state.get().listLoading).toBe(true);
    state.setListLoading(false);
    expect(state.get().listLoading).toBe(false);
  });
  it('should be able to subscribe', () => {
    const state = new State();
    let indicator = false;
    state.onChange(() => {
      indicator = !indicator;
    });
    state.setListLoading(true);
    expect(indicator).toBe(true);
    state.setListLoading(false);
    expect(indicator).toBe(false);
    state.setListLoading(false);
    expect(indicator).toBe(false);
    state.setListLoading(true);
    expect(indicator).toBe(true);
  });
  it('should not call broadcast if not change', () => {
    const state = new State();
    let indicator = true;
    state.onChange(() => {
      indicator = !indicator;
    });

    const testItem = { t: 1 };
    state.setItem(testItem);
    expect(indicator).toBe(false);
    state.setItem(testItem);
    expect(indicator).toBe(false);
    state.setItem({ rt: 1 });
    expect(indicator).toBe(true);

    const testList = [{ t: 1 }];
    state.setList(testList);
    expect(indicator).toBe(false);
    state.setList(testList);
    expect(indicator).toBe(false);
    state.setList([{ rt: 1 }]);
    expect(indicator).toBe(true);
  });
});
