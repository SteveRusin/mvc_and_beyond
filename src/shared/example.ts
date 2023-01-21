import { v4 } from 'uuid';

import { List } from './interfaces';

export const EXAMPLE: List = {
  id: v4(),
  description: 'this is just an example',
  isDone: true,
};
