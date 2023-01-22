export interface Action<T = any> {
  payload: T;
  type: string;
}

export interface IStore {
  onDispatch: (action: Action) => void;
}
