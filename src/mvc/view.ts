import template from '../shared/template.html';
import { getRoot, getAddBtn, getAddInput, getItemsWrapper } from '../shared';
import { render } from 'mustache';

import { Model } from './model';

type OnAddFn = (description: string) => void;
type OnDeleteFn = (id: string) => void;
type OnDoneToggleFn = (id: string) => void;

export interface EventHandlers {
  onAdd: OnAddFn;
  onDelete: OnDeleteFn;
  onDoneToggle: OnDoneToggleFn;
}

export class View {
  private _eventHandlers!: EventHandlers;

  constructor(private _model: Model) {
    this._model.registerUpdate(this.render.bind(this));
  }

  render() {
    const html = render(template, {
      list: this._model.get(),
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

      const toggleId = target.dataset.toggleId;

      if (toggleId != null) {
        return this._eventHandlers.onDoneToggle(toggleId);
      }
    });
  }
}
