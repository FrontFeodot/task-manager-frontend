import { ICustomResponse } from '@common/interfaces/IApiHandler';

export interface IBoardEditorInput {
  fieldName: string;
  currentValue?: string;
  columnId?: string;
  boardId?: string;
  autofocus?: boolean;
  result?: ICustomResponse | null;
  editableField: string | null;
  setEditableField: React.Dispatch<React.SetStateAction<string | null>>;
}
