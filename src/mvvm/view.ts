import {
  getRoot,
} from '../shared';
import { render } from 'mustache';

import templateMVVM from './template-mvvm.html';

export class View {
  constructor() {
    this.render();
  }

  private render() {
    const html = render(templateMVVM, {});

    getRoot().innerHTML = html;

  }
}
