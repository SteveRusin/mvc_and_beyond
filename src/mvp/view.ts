import {
  getRoot,
  getAddBtn,
  getAddInput,
  getItemsWrapper,
  List,
  EventHandlers,
  template,
} from '../shared';
import { render } from 'mustache';

export class View {
  private _eventHandlers!: EventHandlers;

  constructor() {}

  render(list: List[]) {
    const html = render(template, {
      list,
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
