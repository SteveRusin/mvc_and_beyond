import { List } from '../shared';
import { Model } from './model';

export class ViewModel {
  private _model = new Model();

  list = this._model.getList();

  newItemValue = `it's initial value for binding`;


  onAdd() {
    this.list = this._model.add(this.newItemValue);
    this.newItemValue = '';
  }

  onDelete(item: List) {
    this.list = this._model.remove(item.id);
  }
}
