import reduce from 'lodash/reduce';
import assign from 'lodash/assign';

import { getStoriesList } from '@common/helpers/taskHelper';
import { ITaskPriority, ITaskType } from '@common/interfaces/ITask';

export type ISchemas = ITaskPriority | ITaskType;

interface ISelectSchema {
  value: string;
}

export type ISchema = Record<string | number, ISelectSchema>;

export const taskPrioritySchema: ISchema = {
  [ITaskPriority.LOW]: { value: 'Low' },
  [ITaskPriority.MEDIUM]: { value: 'Medium' },
  [ITaskPriority.HIGH]: { value: 'High' },
};

export const taskTypesSchema: ISchema = {
  [ITaskType.TASK]: { value: 'Task' },
  [ITaskType.STORY]: { value: 'Story' },
};

export const getStorySchema = (): ISchema => {
  const stories = getStoriesList();
  return reduce(
    stories,
    (acc: ISchema, story) => {
      const { taskId, title } = story;
      assign(acc, { [taskId]: { value: `№${taskId} | ${title}` } }) as ISchema;
      return acc;
    },
    { 0: { value: 'none' } } as ISchema
  );
};
