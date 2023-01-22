import { Action } from '../shared';
import { IStore } from './interfaces';

let alreadyCreated = false;

class Dispatcher {
  private _stores: IStore[] = [];

  constructor(){
    if(alreadyCreated) {
      throw new Error('Dispatcher should be a singleton');
    }

    alreadyCreated = true;
  }

  registerStore(store: IStore) {
    this._stores.push(store);
  }

  dispatch(action: Action) {
    this._stores.forEach(store => store.onDispatch(action));
  }
}

export const dispatcher = new Dispatcher();
