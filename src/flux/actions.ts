import { Action } from '../shared';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export class AddItemAction implements Action<string> {
  type = ADD_ITEM;

  constructor(public payload: string) {}
}

export class DeleteItemAction implements Action<string> {
  type = DELETE_ITEM;

  constructor(public payload: string) {}
}

export type Actions = AddItemAction | DeleteItemAction;
