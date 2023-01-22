import { EXAMPLE, List } from '../shared';
import { Actions } from './actions';
import { ReducerFn } from './interfaces';

let alreadyCreated = false;

class Store {
  private _reducers: ReducerFn[] = [];
  private _emitStoreUpdateFns: Array<() => void> = [];

  private _list: List[] = [EXAMPLE];

  constructor() {
    if (alreadyCreated) {
      throw new Error('Dispatcher should be a singleton');
    }

    alreadyCreated = true;
  }

  get() {
    return this._list;
  }

  dispatch(action: Actions) {
    this._list = this._reducers.reduce(
      (prevState, reducerFn) => reducerFn(prevState, action),
      this._list
    );

    this._emitStoreUpdateFns.forEach((fn) => fn());
  }

  registerOnStoreUpdate(fn: () => void) {
    this._emitStoreUpdateFns.push(fn);
  }

  registerReducer(fn: ReducerFn) {
    this._reducers.push(fn);
  }
}


export const store = new Store();
