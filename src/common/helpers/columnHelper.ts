import find from 'lodash/find';
import map from 'lodash/map';
import values from 'lodash/values';

import { manageColumnEvent } from '@common/api/socket/socketEvents/boardEvents';
import { IModal } from '@common/providers/appProvider/types';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IBoard, IColumn } from '@common/providers/boardProvider/types';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import {
  getBoardById,
  getCurrentBoardData,
  getCurrentBoardId,
} from './boardHelper';
import { getTasksForColumn } from './taskHelper';

export const getColumns = (): Record<string, IColumn> | undefined => {
  const currentBoardData = getCurrentBoardData();
  if (currentBoardData) {
    return currentBoardData.columns;
  }
};

export const getColumnTitles = (): string[] => {
  const columns = getColumns();
  return map(values(columns), (column) => column.title);
};

export const getColumn = ({
  columnTitle,
  columnId,
}: {
  columnTitle?: string;
  columnId?: string;
}): IColumn | undefined => {
  const columns = getColumns();

  if (!columns) {
    return undefined;
  }
  if (columnId) {
    return columns[columnId];
  }
  if (columnTitle) {
    return find(columns, (column) => column.title === columnTitle);
  }

  return undefined;
};

export const isDoneColumn = (columnId?: string): boolean => {
  const boardId = getCurrentBoardId() as string;

  return (
    useBoardState.getState().boardList![boardId].doneColumn === columnId ||
    false
  );
};

interface IDeleteColumnHelper {
  columnId: string;
  tasksPath?: string;
  boardId: string;
}

export const deleteColumnHelper = ({
  columnId,
  tasksPath,
  boardId,
}: IDeleteColumnHelper): void => {
  const { tasks } = getBoardById(boardId) as IBoard;
  const tasksInColumn = getTasksForColumn(columnId, tasks);
  const hasTasks = !!tasksInColumn.length;
  if (hasTasks && !tasksPath) {
    openModal({
      name: IModal.DELETE_COLUMN_CONFIRM,
      data: { columnId, boardId },
    });
    return;
  }

  manageColumnEvent({ columnId, boardId, isDelete: true, tasksPath });
};
