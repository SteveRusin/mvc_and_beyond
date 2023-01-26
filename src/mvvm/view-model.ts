import { Model } from './model';

export class ViewModel {
  private _model = new Model();

  list = this._model.getList();

  newItemValue = `it's initial value for binding`;


  constructor() {
    (window as any).log = () => console.log(this);
  }

  onAdd() {
    this._model.add(this.newItemValue);
    this.newItemValue = '';
    this.list = this._model.getList();
  }
}
