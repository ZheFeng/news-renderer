import shallowEqual from './utilities/shallowEqual';

class State {

  _state = {
    listLoading: false,
    list: [],
    item: null,
  }
  _listeners = []
  _broadcast() {
    this._listeners.forEach(listener => {
      listener.call();
    });
  }

  /**
   * get - get the entire app state
   *
   * @return {object}  { list: [], item: {}, listLoading: bool }
   */
  get() {
    return this._state;
  }

  /**
   * setListLoading - change the list loading status
   *
   * @param  {bool} listLoading indicate ajax is loading or not
   * @return {self}             State instance itself, to enable chain
   */
  setListLoading(listLoading) {
    const preState = this._state;
    this._state = { ...this._state, listLoading };
    if (!shallowEqual(preState, this._state)) {
      this._broadcast();
    }
    return this;
  }

  /**
   * setList - set the list to display
   *
   * @param  {array<news item>} list the list of news which will be display
   * @return {self}             State instance itself, to enable chain
   */
  setList(list) {
    const preState = this._state;
    this._state = { ...this._state, list };
    if (!shallowEqual(preState, this._state)) {
      this._broadcast();
    }
    return this;
  }

  /**
   * setItem - set the selected news item to display
   *
   * @param  {obj} item the selected news item which will be display
   * @return {self}             State instance itself, to enable chain
   */
  setItem(item) {
    const preState = this._state;
    this._state = { ...this._state, item };
    if (!shallowEqual(preState, this._state)) {
      this._broadcast();
    }
    return this;
  }

  /**
   * onChange - subscribe change event of state
   *
   * @param  {func} listener callback handler, will be called when state chagned
   * @return {self}             State instance itself, to enable chain
   */
  onChange(listener) {
    this._listeners.push(listener);
    return this;
  }
}

export default State;
