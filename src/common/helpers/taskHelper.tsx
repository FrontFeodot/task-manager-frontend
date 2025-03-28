import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from 'react-icons/fc';
import filter from 'lodash/filter';

import {
  ITask,
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from '@common/interfaces/ITask';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import {
  getBoardById,
  getCurrentBoardData,
  getCurrentBoardTitle,
} from './boardHelper';
import { find, map, maxBy } from 'lodash';
import { IColumn } from '@common/providers/boardProvider/types';
import { SetURLSearchParams } from 'react-router-dom';

export const getPriorityIcon = (
  priority?: ITaskPriority,
  size: number = 20
) => {
  switch (priority) {
    case ITaskPriority.LOW:
      return <FcLowPriority size={size} />;
    case ITaskPriority.MEDIUM:
      return <FcMediumPriority size={size} />;
    case ITaskPriority.HIGH:
      return <FcHighPriority size={size} />;
    default:
      return <></>;
  }
};

export const getStatusLabel = (status: ITaskStatus): string => {
  switch (status) {
    case ITaskStatus.TO_DO:
      return 'To do';
    case ITaskStatus.IN_PROGRESS:
      return 'In progress';
    case ITaskStatus.DONE:
      return 'Done';
    default:
      return 'Icebox';
  }
};

export const getStoriesList = (): ITask[] | undefined => {
  const currentBoard = getCurrentBoardTitle();
  if (currentBoard) {
    const allTasks = useBoardState.getState().boardList?.[currentBoard].tasks;

    return filter(allTasks, (task) => task.type === ITaskType.STORY);
  }
};

export const getParentTask = (parentTaskId?: number): ITask | undefined => {
  const stories = getStoriesList();
  return find(stories, (story) => story.taskId === parentTaskId);
};

export const getTasksForColumn = (columnId: string, tasks: ITask[]) =>
  filter(tasks, ['columnId', columnId]).sort((a, b) => a.order - b.order);

interface IGetLastOrderByType {
  type: 'columns' | 'tasks';
  columnId?: string;
  boardId: string;
}

export const getLastOrderByType = ({
  type,
  columnId,
  boardId,
}: IGetLastOrderByType): number => {
  const board = getBoardById(boardId);

  if (!board) {
    return 1;
  }

  const { columns, tasks } = board;

  if (type === 'columns') {
    const lastOrderItem = maxBy(columns, 'order');
    return lastOrderItem?.order || 0;
  }

  const currentColumn = find(
    columns,
    (column) => column.columnId === columnId
  ) as IColumn;
  const taskList = getTasksForColumn(currentColumn?.columnId, tasks);
  const lastOrderItem = maxBy(taskList, 'order');
  return lastOrderItem ? lastOrderItem.order + 1 : 1;
};

export const getTaskById = (taskId: number): ITask | undefined => {
  const currentBoard = getCurrentBoardTitle();
  if (currentBoard) {
    const allTasks = useBoardState.getState().boardList?.[currentBoard].tasks;

    return find(allTasks, (task) => task.taskId === taskId);
  }
};

export const closeTaskModal = (setSearchParams: SetURLSearchParams): void => {
  const newSearchParams = new URLSearchParams();
  newSearchParams.delete('taskId');
  setSearchParams(newSearchParams);
};
