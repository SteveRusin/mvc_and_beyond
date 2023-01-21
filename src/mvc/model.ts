import { v4 } from 'uuid';

import { List, EXAMPLE } from '../shared';

export class Model {
  private _emitViewUpdate!: () => void;

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

    this._emitViewUpdate();
  }

  remove(id: string) {
    this._list = this._list.filter((item) => item.id !== id);

    this._emitViewUpdate();
  }

  toggleDone(id: string) {
    this._list = this._list.map((item) =>
      item.id === id
        ? {
            ...item,
            isDone: !item.isDone,
          }
        : item
    );

    this._emitViewUpdate();
  }

  registerUpdate(fn: () => void) {
    this._emitViewUpdate = fn;
  }
}
