import reduce from 'lodash/reduce';

import { getStoriesList } from '@common/helpers/taskHelper';
import {
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from '@common/interfaces/ITask';

export const taskStatusSchema = {
  [ITaskStatus.TO_DO]: 'To do',
  [ITaskStatus.IN_PROGRESS]: 'In progress',
  [ITaskStatus.DONE]: 'Done',
};

export const taskPrioritySchema = {
  [ITaskPriority.LOW]: 'Low',
  [ITaskPriority.MEDIUM]: 'Medium',
  [ITaskPriority.HIGH]: 'High',
};

export const taskTypesSchema = {
  [ITaskType.TASK]: 'Task',
  [ITaskType.STORY]: 'Story',
};

export const getStorySchema = (): Record<number, string> => {
  const stories = getStoriesList();
  return reduce(
    stories,
    (acc, story) => {
      const { taskId, name } = story;
      acc[taskId] = name;
      return acc;
    },
    { 0: 'none' } as Record<number, string>
  );
};
