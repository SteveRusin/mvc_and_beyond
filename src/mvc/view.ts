import {
  getRoot,
  getAddBtn,
  getAddInput,
  getItemsWrapper,
  EventHandlers,
  template,
} from '../shared';
import { render } from 'mustache';

import { Model } from './model';

export class View {
  private _eventHandlers!: EventHandlers;

  constructor(private _model: Model) {
    this._model.registerOnModelUpdate(this.render.bind(this));
  }

  render() {
    const html = render(template, {
      list: this._model.getList(),
    });

    getRoot().innerHTML = html;

    this.attachEventHandlers();
  }

  registerEventHandlers(handlers: EventHandlers) {
    this._eventHandlers = handlers;
  }

  private attachEventHandlers() {
    getAddBtn().addEventListener('click', () => {
      const description = getAddInput().value;

      this._eventHandlers.onAdd(description);
    });

    getItemsWrapper().addEventListener('click', (element) => {
      const target = element.target as HTMLElement;

      const deleteId = target.dataset.deleteId;

      if (deleteId != null) {
        return this._eventHandlers.onDelete(deleteId);
      }
    });
  }
}
