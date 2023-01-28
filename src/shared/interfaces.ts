export interface List {
  id: string;
  description: string;
}

export type OnAddFn = (description: string) => void;
export type OnDeleteFn = (id: string) => void;

export interface EventHandlers {
  onAdd: OnAddFn;
  onDelete: OnDeleteFn;
}
