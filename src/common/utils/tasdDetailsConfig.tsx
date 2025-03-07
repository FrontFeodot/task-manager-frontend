import reduce from 'lodash/reduce';

import { getStoriesList } from '@common/helpers/taskHelper';
import {
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from '@common/interfaces/ITask';
import { assign } from 'lodash';
import { FaCirclePause } from 'react-icons/fa6';
import { GrInProgress } from 'react-icons/gr';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { IconType } from 'react-icons';

export type ISchemas = ITaskStatus | ITaskPriority | ITaskType;

interface ISelectSchema {
  value: string;
  Icon?: IconType;
}

export type ISchema = Record<string | number, ISelectSchema>;

export const taskStatusSchema: ISchema = {
  [ITaskStatus.TO_DO]: { value: 'To do', Icon: FaCirclePause },
  [ITaskStatus.IN_PROGRESS]: { value: 'In progress', Icon: GrInProgress },
  [ITaskStatus.DONE]: { value: 'Done', Icon: IoCheckmarkDoneCircle },
};

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
      assign(acc, { [taskId]: { value: title } }) as ISchema;
      return acc;
    },
    { 0: { value: 'none' } } as ISchema
  );
};
