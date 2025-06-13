import { Dispatch, SetStateAction } from 'react';

import { IBoard } from '@common/providers/boardProvider/types';
import { ICustomResponse } from '@common/interfaces/IApiHandler';

export interface IBoardEditor {
  editorData: IBoard;
  newField?: 'board' | 'column';
  result?: ICustomResponse | null;
}

export interface ISaveButtonHandler {
  fieldValue: string;
  isColumnCreate?: boolean;
  isColumnUpdate?: boolean;
  isBoardCreate?: boolean;
  isBoardUpdate?: boolean;
  isShareBoard?: boolean;
  columnId?: string;
}

export interface IUseBoardHandlers {
  boardId: string;
  editorData: IBoard;
}
