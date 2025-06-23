import { find, map } from 'lodash';

import { manageColumnEvent } from '@common/api/socket/socket';
import { IModal } from '@common/providers/appProvider/types';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IBoard, IColumn } from '@common/providers/boardProvider/types';

import { getBoardById, getCurrentBoardData } from './boardHelper';
import { getTasksForColumn } from './taskHelper';

export const getColumns = (): IColumn[] | undefined => {
  const currentBoardData = getCurrentBoardData();
  if (currentBoardData) {
    return currentBoardData.columns as IColumn[];
  }
};

export const getColumnTitles = (): string[] => {
  const columns = getColumns();
  return map(columns, (column) => column.title);
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

  return find(columns, (column) => {
    if (columnTitle) {
      return column.title === columnTitle;
    }
    if (columnId) {
      return column.columnId === columnId;
    }
    return undefined;
  }) as IColumn | undefined;
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
