import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { IBoardFormValues } from '@common/interfaces/IBoard';
import { IFormItem } from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';
import { ISaveButtonHandler } from '@components/boardNav/boardEditor/BoardEditor.types';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface IBoardEditorInput {
  fieldName: string;
  currentValue?: string;
  saveButtonHandler: (props: ISaveButtonHandler) => Promise<ICustomResponse>;
  closeEditMode: () => void;
  columnId?: string;
  boardId?: string;
  autofocus?: boolean;
}
