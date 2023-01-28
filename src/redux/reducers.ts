import { v4 } from 'uuid';
import { ADD_ITEM, DELETE_ITEM } from './actions';
import { ReducerFn } from './interfaces';

export const reducer: ReducerFn = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          id: v4(),
          description: action.payload,
        },
      ];
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
