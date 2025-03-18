import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { InputHTMLAttributes, SyntheticEvent } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface ITask {
  taskId: number;
  title: string;
  userId: string;
  status: ITaskStatus;
  priority: ITaskPriority;
  description?: string;
  customFields?: Record<string, string>;
  type?: ITaskType;
  parentTask?: number;
  boardId: string;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
  order: number;
  id?: UniqueIdentifier; // for dnd
}

export enum ITaskStatus {
  TO_DO = 'to do',
  IN_PROGRESS = 'in progress',
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
  setValue?: UseFormSetValue<ITaskFormValues>;
  register: UseFormRegister<ITaskFormValues>;
  watch?: UseFormWatch<ITaskFormValues>;
  handleChange?: (e: SyntheticEvent) => void;
}
