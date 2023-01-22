import { render } from 'mustache';

import template from '../shared/template.html';
import { getAddBtn, getAddInput, getItemsWrapper, getRoot } from '../shared';
import { AddItemAction, DeleteItemAction, ToggleIsDoneAction } from './actions';
import { store } from './store';

export class View {
  constructor() {
    store.registerOnStoreUpdate(() => this.render());
    this.render();
  }

  render() {
    const html = render(template, {
      list: store.get(),
    });

    getRoot().innerHTML = html;
    this.attachEventHandlers();
  }

  private attachEventHandlers() {
    getAddBtn().addEventListener('click', () => {
      const description = getAddInput().value;

      store.dispatch(new AddItemAction(description));
    });

    getItemsWrapper().addEventListener('click', (element) => {
      const target = element.target as HTMLElement;

      const deleteId = target.dataset.deleteId;

      if (deleteId != null) {
        return store.dispatch(new DeleteItemAction(deleteId));
      }

      const toggleId = target.dataset.toggleId;

      if (toggleId != null) {
        return store.dispatch(new ToggleIsDoneAction(toggleId));
      }
    });
  }
}
