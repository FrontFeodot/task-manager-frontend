import { UniqueIdentifier } from '@dnd-kit/core';
import { InputHTMLAttributes, SyntheticEvent } from 'react';
import {
  FieldValues,
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

export interface IFormItem<T, TFieldValues extends FieldValues>
  extends InputHTMLAttributes<T> {
  setValue?: UseFormSetValue<TFieldValues>;
  register?: UseFormRegister<TFieldValues>;
  watch?: UseFormWatch<TFieldValues>;
  handleChange?: (e: SyntheticEvent) => void;
}
