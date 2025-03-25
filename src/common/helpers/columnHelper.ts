import { find, map } from 'lodash';

import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { IBoard, IColumn } from '@common/providers/boardProvider/types';
import {
  getBoardById,
  getCurrentBoardData,
  getCurrentBoardId,
  getCurrentBoardTitle,
} from './boardHelper';
import { getLastOrderByType, getTasksForColumn } from './taskHelper';
import { createColumnApi, deleteColumn } from '@common/api/columnApi';
import { getBoards } from '@common/api/boardApi';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';

export const getColumns = (): IColumn[] | undefined => {
  const currentBoard = getCurrentBoardTitle();
  if (currentBoard) {
    return useBoardState.getState().boardList?.[currentBoard]
      .columns as IColumn[];
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

export const createColumnHelper = async (
  title: string,
  boardId: string
): Promise<ICustomResponse> => {
  const lastColumnOrder = getLastOrderByType({ type: 'columns', boardId });
  console.log('lastColumnOrder', lastColumnOrder);
  const columnPayload = { title, boardId, order: lastColumnOrder + 1 };
  const response = await createColumnApi(columnPayload);
  if (response.isError) {
    return response;
  }
  getBoards();
  return response;
};

interface IDeleteColumnHelper {
  columnId: string;
  tasksPath?: string;
  boardId: string;
}

export const deleteColumnHelper = async ({
  columnId,
  tasksPath,
  boardId,
}: IDeleteColumnHelper): Promise<ICustomResponse | void> => {
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

  try {
    const resposne = await deleteColumn({
      boardId,
      columnId,
      ...(tasksPath ? { tasksPath } : {}),
    });
    console.log('deleteColumnresposne', resposne);
    if (resposne.isError) {
      throw resposne;
    }
    console.log('deleteColumn', resposne);
    return resposne;
  } catch (err) {
    return err as ICustomResponse;
  }

  return;
};
