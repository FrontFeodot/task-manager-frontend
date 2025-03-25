import { IBoard, IColumn } from '@common/providers/boardProvider/types';

export const emptyBoard: Partial<IBoard> = {
  columns: [] as IColumn[],
  title: '',
};
