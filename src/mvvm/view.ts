import {
  getRoot,
} from '../shared';

import templateMVVM from './template-mvvm.html';

export class View {
  constructor() {
    this.render();
  }

  private render() {
    getRoot().innerHTML = templateMVVM;
  }
}
