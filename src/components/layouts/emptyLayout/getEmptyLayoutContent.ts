import { getCurrentBoardData } from '@common/helpers/boardHelper';
import { IModal } from '@common/providers/appProvider/types';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IBoard } from '@common/providers/boardProvider/types';
import { openEditor } from '@common/providers/boardProvider/useBoardState';
import { emptyBoard } from '@common/utils/boardEditorConfig';

import { IEmptyLayoutType, IGetEmptyLayoutData } from './EmptyLayout.types';

export const getEmptyLayoutContent = (
  type: IEmptyLayoutType
): IGetEmptyLayoutData => {
  switch (type) {
    case IEmptyLayoutType.BOARD:
      return {
        textContent: `You don't have boards yet. Go to settings to `,
        textLink: `create your first board`,
        callback: () =>
          openEditor({ newField: 'board', data: emptyBoard as IBoard }),
      };
    case IEmptyLayoutType.COLUMN:
      return {
        textContent: `You don't have column yet. Go to settings to `,
        textLink: `create your first column`,
        callback: () =>
          openEditor({
            newField: 'column',
            data: getCurrentBoardData() || (emptyBoard as IBoard),
          }),
      };
    case IEmptyLayoutType.TASK:
      return {
        textContent: 'This task does not exist. ',
        textLink: 'Click here to create a new task',

        callback: () => openModal({ name: IModal.CREATE_TASK }),
      };
  }
};
