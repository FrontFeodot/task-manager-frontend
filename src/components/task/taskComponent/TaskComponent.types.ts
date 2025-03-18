import {
  ITask,
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from '@common/interfaces/ITask';

export interface ITaskComponent {
  task: ITask;
  columnList: string[];
  closeTask: () => void;
}

export interface ITaskFormValues {
  title: string;
  status: ITaskStatus;
  priority: ITaskPriority;
  description?: string;
  customFields?: Record<string, string>;
  type?: ITaskType;
  parentTask?: number;
  column: string;
}
