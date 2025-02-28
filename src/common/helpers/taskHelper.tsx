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

import { getCurrentBoard } from './boardHelper';

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

export const getStoriesList = (): ITask[] => {
  const currentBoard = getCurrentBoard();
  const allTasks = useBoardState.getState().boardList?.[currentBoard].tasks;

  return filter(allTasks, (task) => task.type === ITaskType.STORY);
};

export const getColumns = (): string[] => {
  const currentBoard = getCurrentBoard();
  return useBoardState.getState().boardList?.[currentBoard].columns as string[];
};
