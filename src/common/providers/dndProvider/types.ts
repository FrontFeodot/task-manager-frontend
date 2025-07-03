import { UniqueIdentifier } from '@dnd-kit/core';

export interface IDndState {
  draggingItem: IDraggingItem | null;
  orderedColumns: string[] | null;
  orderedTasks: Record<string, Record<number, ITasksSchema>> | null;
}

export type IDndSchema = Record<string, IColumnSchema>;

export interface IColumnSchema {
  columnId: string;
  title: string;
  order: number;
  boardId: string;
  isDone: boolean;
  tasks: ITasksSchema[];
}

export interface ITasksSchema {
  taskId: number;
  order: number;
  columnId: string;
  isDone?: boolean;
}

export interface IDraggingItem {
  type: IDraggingItemType;
  itemId?: UniqueIdentifier;
  columnId?: string;
}

export type IDraggingItemType = 'columns' | 'tasks';
