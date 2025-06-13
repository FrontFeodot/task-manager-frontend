import { createBoard } from '@common/api/boardApi';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { setCurrentBoardAction } from './boardHelper';
import {
  IManageColumn,
  manageColumnEvent,
  manageMembersEvent,
  updateBoardData,
} from '@common/api/socket/socket';
import { getLastOrderByType } from './taskHelper';
import {
  openEditor,
  setBoardEditorResult,
} from '@common/providers/boardProvider/useBoardState';
import { emptyBoard } from '@common/utils/boardEditorConfig';
import { IBoard } from '@common/providers/boardProvider/types';

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
    updateBoardData({ boardId, title: fieldValue });
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

  setBoardEditorResult({ isError: 1, message: 'Unhandled' } as ICustomResponse);
};
