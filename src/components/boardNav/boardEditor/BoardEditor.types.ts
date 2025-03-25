import { IBoard } from '@common/providers/boardProvider/types';
import { Dispatch, SetStateAction } from 'react';

export interface IBoardEditor {
  board: IBoard;
  setUpdatedData?: Dispatch<SetStateAction<string | null>>;
}

export interface ISaveButtonHandler {
  fieldValue: string;
  isColumnCreate?: boolean;
  isColumnUpdate?: boolean;
  isBoardCreate?: boolean;
  isBoardUpdate?: boolean;
  columnId?: string;
}
