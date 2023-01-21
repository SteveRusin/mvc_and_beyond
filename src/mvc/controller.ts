import { Model } from './model';
import { View } from './view';

export class Controller {
  private _model = new Model();
  private _view = new View(this._model);

  constructor() {
    this._view.registerEventHandlers({
      onAdd: (description) => this._model.add(description),
      onDelete: (id) => this._model.remove(id),
      onDoneToggle: (id) => this._model.toggleDone(id),
    });

    this._view.render();
  }
}
