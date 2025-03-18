import { IColumn } from '@common/providers/boardProvider/types';

export interface IUpdateTaskOrder {
  taskId: number;
  order: number;
  columnId: string;
}

export interface IUpdateColumnOrder {
  columns: IColumn[];
  boardId: string;
}
