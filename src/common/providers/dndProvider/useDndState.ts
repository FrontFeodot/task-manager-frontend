import { difference, forEach, keys, values } from 'lodash';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getBoardSchema } from '@common/helpers/dragAndDrop/dndHelper';
import { IDragOverHelper } from '@common/interfaces/IDnd';
import { ITask } from '@common/interfaces/ITask';

import { IBoard, IColumn } from '../boardProvider/types';
import defaultState from './state';
import { IDndState, IDraggingItem } from './types';

export const useDndState = create<IDndState>()(immer((_) => defaultState));

export const setDndData = (board: IBoard): void => {
  const { columnSchema, tasksSchema } = getBoardSchema(board);
  useDndState.setState((state) => {
    state.orderedColumns = columnSchema;
    state.orderedTasks = tasksSchema;
  });
};

export const setDraggingItem = (draggingItem: IDraggingItem | null): void => {
  useDndState.setState((state) => {
    state.draggingItem = draggingItem;
  });
};

export const updateDndColumns = (unparsedColumns: Record<string, IColumn>) => {
  const columns = keys(unparsedColumns).sort(
    (a, b) => unparsedColumns![a].order - unparsedColumns![b].order
  );
  useDndState.setState((state) => {
    if (columns.length < state.orderedColumns!.length) {
      const deletedColumns = difference(state.orderedColumns, columns);
      deletedColumns.forEach((columnId) => {
        delete state.orderedTasks![columnId];
      });
    } else {
      const newColumns = difference(columns, state.orderedColumns!);
      newColumns.forEach((columnId) => {
        state.orderedTasks![columnId] = {};
      });
    }
    state.orderedColumns = columns;
  });
};

export const updateDndTasks = ({
  tasks,
  isDelete,
}: {
  tasks?: Partial<ITask>[];
  isDelete?: boolean;
}) => {
  useDndState.setState((state) => {
    if (tasks) {
      forEach(tasks, (task) => {
        state.orderedColumns?.forEach((columnId) => {
          if (state.orderedTasks![columnId]?.[task.taskId!]) {
            delete state.orderedTasks![columnId][task.taskId!];
          }
        });
        if (!isDelete) {
          state.orderedTasks![task.columnId!][task.taskId!] = {
            ...state.orderedTasks![task.columnId!][task.taskId!],
            ...task,
          };
        }
      });

      return;
    }
  });
};

export const updateDoneTasks = (tasks: Partial<ITask>[]) => {
  useDndState.setState((state) => {
    forEach(tasks, (task) => {
      const taskFromState = state.orderedTasks![task.columnId!][task.taskId!];
      if (taskFromState.isDone) return;
      state.orderedTasks![task.columnId!][task.taskId!] = {
        ...state.orderedTasks![task.columnId!][task.taskId!],
        isDone: true,
      };
    });
  });
};

export const handleDragOverColumns = ({
  sourceId,
  targetId,
}: Pick<IDragOverHelper, 'sourceId' | 'targetId'>) =>
  useDndState.setState((state) => {
    const columns = state.orderedColumns;

    if (!columns) return;

    const fromIndex = columns.findIndex((c) => c === sourceId);
    const toIndex = columns.findIndex((c) => c === targetId);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;
    const moved = columns.splice(fromIndex, 1)[0];
    columns.splice(toIndex, 0, moved);
  });

export const handleDragOverTasks = ({
  sourceId,
  targetId,
  sourceTaskColumnId,
  targetTaskColumnId,
}: Omit<IDragOverHelper, 'type'>) => {
  if (!sourceTaskColumnId || sourceId === undefined) return;

  useDndState.setState((state) => {
    const tasks = state.orderedTasks;
    if (!tasks) return;

    const sourceKey = sourceTaskColumnId;
    const destKey = targetTaskColumnId || sourceTaskColumnId;

    // Prepare arrays for source and destination
    const sourceArr = values(tasks[sourceKey] || {}).sort(
      (a, b) => a.order - b.order
    );

    // Find source index
    const fromIndex = sourceArr.findIndex((t) => t.taskId === sourceId);
    if (fromIndex < 0) return;

    const isTargetTask = typeof targetId === 'number';
    let toIndex;

    if (sourceKey === destKey) {
      // Reordering within same column
      toIndex = isTargetTask
        ? sourceArr.findIndex((t) => t.taskId === targetId)
        : sourceArr.length;
      if (toIndex < 0) toIndex = sourceArr.length;

      const [moved] = sourceArr.splice(fromIndex, 1);
      sourceArr.splice(toIndex, 0, moved);

      // Update orders for this column
      sourceArr.forEach((t, i) => {
        tasks[sourceKey][t.taskId as number] = {
          ...tasks[sourceKey][t.taskId as number],
          order: i + 1,
        };
      });
      return;
    }

    // Moving between different columns
    const targetArr = values(tasks[destKey] || {}).sort(
      (a, b) => a.order - b.order
    );

    toIndex = isTargetTask
      ? targetArr.findIndex((t) => t.taskId === targetId)
      : targetArr.length;
    if (toIndex < 0) toIndex = targetArr.length;

    // Remove from source
    const [movingTask] = sourceArr.splice(fromIndex, 1);
    sourceArr.forEach((t, i) => {
      tasks[sourceKey][t.taskId as number] = {
        ...tasks[sourceKey][t.taskId as number],
        order: i + 1,
      };
    });
    delete tasks[sourceKey][sourceId as number];

    // Insert into destination
    targetArr.splice(toIndex, 0, { ...movingTask, columnId: destKey });
    targetArr.forEach((t, i) => {
      tasks[destKey][t.taskId as number] = {
        ...tasks[destKey][t.taskId as number],
        ...t,
        order: i + 1,
      };
    });
  });
};
