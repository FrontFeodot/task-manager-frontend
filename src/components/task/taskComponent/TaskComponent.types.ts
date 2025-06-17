import { Dispatch } from 'react';

import { ITask, ITaskPriority, ITaskType } from '@common/interfaces/ITask';

export interface ITaskComponent {
  task: ITask;
  columnList: string[];
  closeTask: () => void;
  setHasUnsavedChanges: Dispatch<React.SetStateAction<boolean>>;
}

export interface ITaskFormValues {
  title: string;
  isDone: boolean;
  priority: ITaskPriority;
  description?: string;
  customFields?: Record<string, string>;
  type?: ITaskType;
  parentTask?: number;
  column: string;
}
