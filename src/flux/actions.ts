import { Action } from './interfaces';

export const ADD_ITEM = 'ADD_ITEM';
export const TOGGLE_IS_DONE = 'TOGGLE_IS_DONE';
export const DELETE_ITEM = 'DELETE_ITEM';

export class AddItemAction implements Action<string> {
  type = ADD_ITEM;

  constructor(public payload: string) {}
}

export class ToggleIsDoneAction implements Action<string> {
  type = TOGGLE_IS_DONE;

  constructor(public payload: string) {}
}

export class DeleteItemAction implements Action<string> {
  type = DELETE_ITEM;

  constructor(public payload: string) {}
}

export type Actions = AddItemAction | ToggleIsDoneAction | DeleteItemAction;
