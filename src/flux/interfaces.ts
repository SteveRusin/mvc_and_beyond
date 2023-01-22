import { Action } from '../shared';

export interface IStore {
  onDispatch: (action: Action) => void;
}
