import { v4 } from 'uuid';

import { List, EXAMPLE } from '../shared';

export class Model {
  private _list: List[] = [EXAMPLE];

  getList() {
    return this._list;
  }

  add(description: string) {
    this._list = [
      ...this._list,
      {
        id: v4(),
        description,
      },
    ];
  }

  remove(id: string) {
    this._list = this._list.filter((item) => item.id !== id);
  }
}
