import { InputHTMLAttributes } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface ITask {
  taskId: number;
  name: string;
  userId: string;
  status: ITaskStatus;
  priority: ITaskPriority;
  description?: string;
  customFields?: Record<string, string>;
  type?: ITaskType;
  parentTask?: string;
  board: string;
  column: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ITaskStatus {
  TO_DO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export enum ITaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ITaskType {
  TASK = 'task',
  STORY = 'story',
}

export interface ITaskFormItem<T> extends InputHTMLAttributes<T> {
  setValue: UseFormSetValue<Partial<ITask>>;
  register: UseFormRegister<Partial<ITask>>;
  watch: UseFormWatch<Partial<ITask>>;
}
