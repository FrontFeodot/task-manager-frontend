import { keys } from 'lodash';

import { IBoard } from '@common/providers/boardProvider/types';
import { IDndSchema, ITasksSchema } from '@common/providers/dndProvider/types';

export const getBoardSchema = (board: IBoard) => {
  const boardSchema: IDndSchema = {};

  const columnSchema: string[] = [];
  const tasksSchema: Record<string, Record<number, ITasksSchema>> = {};

  Object.keys(board.columns).forEach((columnId) => {
    const order = board.columns[columnId].order;
    boardSchema[columnId] = {
      title: board.columns[columnId].title,
      order,
      columnId,
      isDone: board.doneColumn === columnId,
      boardId: board.boardId,
      tasks: [],
    };
    tasksSchema[columnId] = {};
  });

  columnSchema.push(
    ...keys(boardSchema).sort(
      (a, b) => boardSchema[a].order - boardSchema[b].order
    )
  );

  Object.values(board.tasks).forEach(({ taskId, order, columnId, isDone }) => {
    boardSchema[columnId]?.tasks.push({
      taskId,
      order,
      columnId,
      isDone,
    });
  });

  for (const { taskId, order, columnId, isDone } of Object.values(
    board.tasks
  )) {
    if (tasksSchema[columnId]) {
      tasksSchema[columnId][taskId] = {
        taskId,
        order,
        columnId,
        isDone,
      };
    }
  }

  return { boardSchema, columnSchema, tasksSchema };
};
