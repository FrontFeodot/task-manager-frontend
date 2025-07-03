import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { IBoard } from '@common/providers/boardProvider/types';

export interface IBoardEditorInput {
  fieldName: string;
  currentValue?: string;
  columnId?: string;
  boardId?: string;
  autofocus?: boolean;
  result?: ICustomResponse<Partial<IBoard>> | null;
  editableField: string | null;
  setEditableField: React.Dispatch<React.SetStateAction<string | null>>;
}
