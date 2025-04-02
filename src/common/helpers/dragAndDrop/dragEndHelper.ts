import map from 'lodash/map';
import { Over } from '@dnd-kit/core';

import {
  updateColumnOrder,
  updateTaskOrder,
} from '@common/api/updateTaskOrder';
import { ITask } from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';
import { IUpdateTaskOrder } from '@common/interfaces/IDnd';

export const taskDragEnd = async (
  over: Over,
  tasks: ITask[],
  initialColumnId?: string
) => {
  const targetColumnId = over.data.current?.sortable?.containerId || over.id;

  if (!targetColumnId) return;

  const tasksInInitial = tasks.filter((t) => t.columnId === initialColumnId);
  const tasksInTarget = tasks.filter((t) => t.columnId === targetColumnId);

  const tasksToUpdate =
    initialColumnId === targetColumnId
      ? tasksInInitial
      : [...tasksInInitial, ...tasksInTarget];

  const payload = map(
    tasksToUpdate,
    ({ taskId, order, columnId, boardId }) => ({
      taskId,
      order,
      columnId,
      boardId,
    })
  );

  try {
    const response = await updateTaskOrder(payload as IUpdateTaskOrder[]);
    if (response.isError) {
      throw response;
    }
  } catch (err) {
    console.error('DragAndDrop error: ', err);
  }
};

export const columnDragEnd = async (boardId: string, columns: IColumn[]) => {
  try {
    const response = await updateColumnOrder({
      boardId,
      columns,
    });
    if (response.isError) {
      throw response;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
