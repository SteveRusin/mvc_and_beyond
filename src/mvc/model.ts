import { v4 } from 'uuid';

import { List, EXAMPLE } from '../shared';

export class Model {
  private _emitModelUpdate!: () => void;

  private _list: List[] = [EXAMPLE];

  get() {
    return this._list;
  }

  add(description: string) {
    this._list = [
      ...this._list,
      {
        id: v4(),
        description,
        isDone: false,
      },
    ];

    this._emitModelUpdate();
  }

  remove(id: string) {
    this._list = this._list.filter((item) => item.id !== id);

    this._emitModelUpdate();
  }

  registerOnModelUpdate(fn: () => void) {
    this._emitModelUpdate = fn;
  }
}
