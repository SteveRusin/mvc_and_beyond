import {
  getAddBtn,
  getAddInput,
  getItemsWrapper,
  getRoot,
  template,
} from '../shared';
import { render } from 'mustache';
import { Store } from './store';
import { dispatcher } from './dispatcher';
import { AddItemAction, DeleteItemAction } from './actions';

export class View {
  private _store = new Store();

  constructor() {
    this._store.registerOnStoreUpdate(() => this.render());
    this.render();
  }

  render() {
    const html = render(template, {
      list: this._store.get(),
    });

    getRoot().innerHTML = html;
    this.attachEventHandlers();
  }

  private attachEventHandlers() {
    getAddBtn().addEventListener('click', () => {
      const description = getAddInput().value;

      dispatcher.dispatch(new AddItemAction(description));
    });

    getItemsWrapper().addEventListener('click', (element) => {
      const target = element.target as HTMLElement;

      const deleteId = target.dataset.deleteId;

      if (deleteId != null) {
        return dispatcher.dispatch(new DeleteItemAction(deleteId));
      }
    });
  }
}
