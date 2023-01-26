import { View } from './view';
import { ViewModel } from './view-model';

import { bindTemplate } from './utils';

const view = new View();
const viewModel = new ViewModel();

bindTemplate(viewModel);
