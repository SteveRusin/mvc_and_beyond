import { v4 } from 'uuid';

import { List, EXAMPLE } from '../shared';
import { IStore } from './interfaces';
import { dispatcher } from './dispatcher';
import { Actions, ADD_ITEM, DELETE_ITEM } from './actions';

export class Store implements IStore {
  private _emitStoreUpdate!: () => void;

  private _list: List[] = [EXAMPLE];

  constructor() {
    dispatcher.registerStore(this);
  }

  getList() {
    return this._list;
  }

  onDispatch(action: Actions) {
    switch (action.type) {
      case ADD_ITEM:
        this._list = [
          ...this._list,
          {
            id: v4(),
            description: action.payload,
          },
        ];

        break;
      case DELETE_ITEM:
        this._list = this._list.filter((item) => item.id !== action.payload);

        break;
      default:
        throw new Error(`Unknown action: ${action.type}`);
    }

    this._emitStoreUpdate();
  }

  registerOnStoreUpdate(fn: () => void) {
    this._emitStoreUpdate = fn;
  }
}
