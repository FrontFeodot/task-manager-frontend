import map from 'lodash/map';

import { ITask } from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';

import { getTasksForColumn } from '../taskHelper';
import {
  handleMoveBetweenColumns,
  handleReorderWithinColumn,
} from './dndHelper';
import { Active, Over, UniqueIdentifier } from '@dnd-kit/core';

const taskDragOver = (
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  initialColumnId: string,
  targetColumnId: string,
  tasks: ITask[]
) => {
  // No action needed if hovering over source column container
  if (initialColumnId === overId) return;

  // Get tasks for relevant columns
  const initialColumnTasks = getTasksForColumn(
    initialColumnId,
    tasks
  ) as ITask[];
  const targetColumnTasks = getTasksForColumn(targetColumnId, tasks) as ITask[];
  console.log(targetColumnTasks);
  // Find the specific tasks involved
  const activeTask = initialColumnTasks.find(
    (task) => task.taskId === activeId
  ) as ITask;
  const replacedTask = targetColumnTasks.find(
    (task) => task.taskId === overId
  ) as ITask;

  if (!activeTask) return; // Safety check

  let updatedTasks;
  if (initialColumnId === targetColumnId) {
    // Reordering within the same column
    updatedTasks = handleReorderWithinColumn(
      initialColumnTasks,
      activeTask,
      replacedTask
    );
  } else {
    // Moving between columns
    updatedTasks = handleMoveBetweenColumns(
      initialColumnTasks,
      targetColumnTasks,
      activeTask,
      targetColumnId,
      replacedTask
    );
  }
  return updatedTasks;
};

const columnDragOver = (
  activeColumnId: UniqueIdentifier,
  overColumnId: UniqueIdentifier,
  columns: IColumn[]
): IColumn[] => {
  const oldIndex = columns.findIndex((col) => col.columnId === activeColumnId);
  const newIndex = columns.findIndex((col) => col.columnId === overColumnId);

  const updatedColumns = [...columns];
  const [movedColumn] = updatedColumns.splice(oldIndex, 1);
  updatedColumns.splice(newIndex, 0, movedColumn);

  return map(updatedColumns, (col, index) => ({
    ...col,
    order: index + 1,
  }));
};

interface IDragOverHelper {
  active: Active;
  over: Over | null;
  tasks?: ITask[];
  columns?: IColumn[];
}

export const handleDragOverHelper = ({
  active,
  over,
  tasks,
  columns,
}: IDragOverHelper): ITask[] | IColumn[] | void => {
  if (!over) return;

  const activeId = active.id;
  const overId = over.id;

  // No action needed if hovering over self
  if (activeId === overId) return;

  const initialColumnId = active.data.current?.sortable?.containerId as string;
  const targetColumnId = over?.data.current?.sortable?.containerId || overId;
  if (tasks) {
    return taskDragOver(
      activeId,
      overId,
      initialColumnId,
      targetColumnId,
      tasks
    );
  }
  if (columns) {
    return columnDragOver(activeId, overId, columns);
  }
};
