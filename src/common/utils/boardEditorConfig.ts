import { IBoard, IColumn } from '@common/providers/boardProvider/types';

export const emptyBoard: Partial<IBoard> = {
  columns: {} as Record<string, IColumn>,
  title: '',
};
