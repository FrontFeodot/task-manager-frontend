import { createBoard } from '@common/api/boardApi';
import {
  manageColumnEvent,
  manageMembersEvent,
  updateBoardDataEvent,
} from '@common/api/socket/socketEvents/boardEvents';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { IManageColumn } from '@common/interfaces/ISocketEvents';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  openEditor,
  setBoardEditorResult,
} from '@common/providers/boardProvider/useBoardState';

import { setCurrentBoardAction } from './boardHelper';
import { getLastOrderByType } from './taskHelper';

export interface IEditorInputSubmit {
  fieldValue: string;
  isColumnCreate?: boolean;
  isColumnUpdate?: boolean;
  isBoardCreate?: boolean;
  isBoardUpdate?: boolean;
  isShareBoard?: boolean;
  columnId?: string;
  boardId?: string;
}

const createColumnHelper = (title: string, boardId: string): IManageColumn => {
  const lastColumnOrder = getLastOrderByType({ type: 'columns', boardId });
  return { title, boardId, order: lastColumnOrder + 1 };
};

export const onEditorInputSubmit = async ({
  fieldValue,
  isBoardCreate,
  isBoardUpdate,
  isColumnCreate,
  isColumnUpdate,
  isShareBoard,
  columnId,
  boardId,
}: IEditorInputSubmit): Promise<ICustomResponse<string | undefined> | void> => {
  if (isBoardCreate) {
    const response = await createBoard(fieldValue);
    if (response.payload) {
      openEditor({ data: response.payload });
      setCurrentBoardAction(response.payload.boardId);
    }
    return;
  }

  if (isBoardUpdate && boardId) {
    updateBoardDataEvent({ boardId, title: fieldValue });
    return;
  }

  if (!boardId) return;

  if (isColumnCreate) {
    const columnData = createColumnHelper(fieldValue, boardId);
    manageColumnEvent(columnData);
    return;
  }
  if (isColumnUpdate) {
    manageColumnEvent({ title: fieldValue, columnId, boardId });
    return;
  }
  if (isShareBoard) {
    manageMembersEvent({ type: 'share', boardId, memberEmail: fieldValue });
    return;
  }

  setBoardEditorResult({ isError: 1, message: 'Unhandled' } as ICustomResponse<
    Partial<IBoard>
  >);
};
