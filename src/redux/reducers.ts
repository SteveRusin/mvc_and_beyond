import { v4 } from 'uuid';
import { ADD_ITEM, DELETE_ITEM, TOGGLE_IS_DONE } from './actions';
import { ReducerFn } from './interfaces';

export const reducer: ReducerFn = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          id: v4(),
          description: action.payload,
          isDone: false,
        },
      ];
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case TOGGLE_IS_DONE:
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item
      );
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
