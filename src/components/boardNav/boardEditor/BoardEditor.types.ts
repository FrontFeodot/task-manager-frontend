import { Dispatch, SetStateAction } from 'react';

import { IBoard } from '@common/providers/boardProvider/types';

export interface IBoardEditor {
  editorData: IBoard;
  newField?: 'board' | 'column';
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

export interface IUseBoardHandlers {
  boardId: string;
  editorData: IBoard;
  setUpdatedData?: Dispatch<SetStateAction<string | null>>;
}
