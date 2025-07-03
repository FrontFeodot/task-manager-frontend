import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { IBoard, IOpenedEditor } from '@common/providers/boardProvider/types';

export interface IBoardEditor {
  openedEditor: IOpenedEditor;
  newField?: 'board' | 'column';
  result?: ICustomResponse<Partial<IBoard>> | null;
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
