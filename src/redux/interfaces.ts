import { List } from '../shared';
import { Actions } from './actions';

export type ReducerFn = (state: List[], action: Actions) => List[];
