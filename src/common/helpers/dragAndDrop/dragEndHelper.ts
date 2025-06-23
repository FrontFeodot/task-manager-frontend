import { filter } from 'lodash';
import map from 'lodash/map';

import {
  updateBoardData,
  updateMultiplyTasksEvent,
} from '@common/api/socket/socket';
import { ITask } from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';

import { Over } from '@dnd-kit/core';

export const taskDragEnd = async (
  over: Over,
  tasks: ITask[],
  doneColumn: string | null,
  boardId: string,
  initialColumnId?: string
) => {
  const targetColumnId = over.data.current?.sortable?.containerId || over.id;

  if (!targetColumnId) return;

  const tasksInInitial = filter(tasks, (t) => t.columnId === initialColumnId);
  const tasksInTarget = filter(tasks, (t) => t.columnId === targetColumnId);

  const tasksToUpdate =
    initialColumnId === targetColumnId
      ? tasksInInitial
      : [...tasksInInitial, ...tasksInTarget];
  const payload = map(
    tasksToUpdate,
    ({ taskId, order, columnId, boardId, isDone }) => ({
      taskId,
      order,
      columnId,
      boardId,
      isDone: doneColumn === columnId || isDone,
    })
  );

  updateMultiplyTasksEvent(boardId, payload);
};

export const columnDragEnd = async (boardId: string, columns: IColumn[]) => {
  updateBoardData({
    boardId,
    columns,
  });
};
