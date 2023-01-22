export interface Action<T = any> {
  payload: T;
  type: string;
}
