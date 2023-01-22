import { View } from './view';
import { store } from './store';
import { reducer } from './reducers';

store.registerReducer(reducer);

new View();
