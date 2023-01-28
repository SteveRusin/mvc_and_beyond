import { Model } from './model';
import { View } from './view';

export class Presenter {
  private _model = new Model();
  private _view = new View();

  constructor() {
    this._view.registerEventHandlers({
      onAdd: (description) => this._model.add(description),
      onDelete: (id) => this._model.remove(id),
    });

    this._model.registerOnModelUpdate(() => this.renderView());

    this.renderView();
  }

  private renderView() {
    this._view.render(this._model.getList());
  }
}
