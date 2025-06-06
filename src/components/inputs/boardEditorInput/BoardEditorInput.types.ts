import { ISaveButtonHandler } from '@components/boardNav/boardEditor/BoardEditor.types';

import { ICustomResponse } from '@common/interfaces/IApiHandler';

export interface IBoardEditorInput {
  fieldName: string;
  currentValue?: string;
  saveButtonHandler: (
    props: ISaveButtonHandler
  ) => Promise<ICustomResponse<string | undefined>>;
  closeEditMode: () => void;
  columnId?: string;
  boardId?: string;
  autofocus?: boolean;
}
