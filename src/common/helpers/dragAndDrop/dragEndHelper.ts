import { values } from 'lodash';
import map from 'lodash/map';

import { updateBoardDataEvent } from '@common/api/socket/socketEvents/boardEvents';
import { updateMultiplyTasksEvent } from '@common/api/socket/socketEvents/taskEvents';
import { IColumn } from '@common/providers/boardProvider/types';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import {
  updateDoneTasks,
  useDndState,
} from '@common/providers/dndProvider/useDndState';

import { isDoneColumn } from '../columnHelper';

export const taskDragEnd = async ({
  targetColumnId,
  initialColumnId,
}: {
  targetColumnId: string;
  initialColumnId?: string;
}) => {
  const boardId = useBoardState.getState().currentBoardId!;
  if (!targetColumnId || !initialColumnId) return;
  const orderedTasks = useDndState.getState().orderedTasks!;

  const tasksInInitial = values(orderedTasks[initialColumnId]);
  const tasksInTarget = values(orderedTasks[targetColumnId]);
  const tasksToUpdate =
    initialColumnId === targetColumnId
      ? [...tasksInInitial]
      : [...tasksInInitial, ...tasksInTarget];

  const payload = map(tasksToUpdate, ({ taskId, order, columnId, isDone }) => {
    const isColumnDone = isDoneColumn(columnId);
    if (isColumnDone && !isDone) {
    }
    return {
      taskId: taskId as number,
      order,
      columnId,
      isDone: isDoneColumn(columnId) || isDone,
    };
  });
  if (isDoneColumn(targetColumnId)) {
    updateDoneTasks(payload);
  }

  updateMultiplyTasksEvent(boardId, payload);
};

export const columnDragEnd = () => {
  const boardId = useBoardState.getState().currentBoardId!;
  const dndColumns = useDndState.getState().orderedColumns!;
  const boardColumns = useBoardState.getState().boardList![boardId].columns;

  const payload = dndColumns.reduce(
    (acc, columnId, idx) => {
      const column = {
        title: boardColumns[columnId].title,
        columnId,
        order: idx + 1,
      };
      return {
        ...acc,
        [columnId]: {
          ...column,
        },
      };
    },
    {} as Record<string, IColumn>
  );

  updateBoardDataEvent({
    boardId,
    columns: payload,
  });
};
