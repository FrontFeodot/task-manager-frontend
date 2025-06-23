import { filter, map } from 'lodash';

import { ITask } from '@common/interfaces/ITask';

export const handleReorderWithinColumn = (
  columnTasks: ITask[],
  activeTask: ITask,
  replacedTask?: ITask
) => {
  const updatedTasks = map(columnTasks, (task) => {
    // Skip changing tasks not affected by the reordering
    if (
      task.taskId !== activeTask.taskId &&
      task.taskId !== replacedTask?.taskId
    ) {
      return task;
    }

    // Update the active task to take the replaced task's order
    if (task.taskId === activeTask.taskId && replacedTask) {
      return { ...task, order: replacedTask.order };
    }

    // Update the replaced task to take the active task's order
    if (task.taskId === replacedTask?.taskId) {
      return { ...task, order: activeTask.order };
    }

    return task;
  });

  return updatedTasks;
};

export const handleMoveBetweenColumns = (
  sourceColumnTasks: ITask[],
  targetColumnTasks: ITask[],
  activeTask: ITask,
  targetColumnId: string,
  replacedTask?: ITask
) => {
  // Remove task from source column
  const updatedSourceTasks = map(
    filter(sourceColumnTasks, (task) => task.taskId !== activeTask.taskId),
    (task, index) => ({ ...task, order: index + 1 })
  );

  // Prepare the task for insertion into target column
  const taskToMove = {
    ...activeTask,
    columnId: targetColumnId,
    order: replacedTask?.order || targetColumnTasks.length + 1,
  };

  // Add task to target column and reorder
  const updatedTargetTasks = [...targetColumnTasks];
  if (replacedTask) {
    // Insert at specific position and adjust orders
    updatedTargetTasks.map((task) => {
      if (task.order >= taskToMove.order) {
        const copiedTask = { ...task };
        copiedTask.order += 1;
        return copiedTask;
      }
    });
  }

  updatedTargetTasks.push(taskToMove);

  // Sort by order to ensure consistency
  updatedTargetTasks.sort((a, b) => a.order - b.order);

  // Update board state with both column changes at once
  return [...updatedSourceTasks, ...updatedTargetTasks];
};
