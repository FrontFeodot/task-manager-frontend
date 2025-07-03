import { InputHTMLAttributes, SyntheticEvent } from 'react';
import { RawDraftContentState } from 'react-draft-wysiwyg';
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
  isDone: boolean;
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

export type IRawForCompare = Omit<RawDraftContentState, 'blocks'> & {
  blocks: Array<Omit<RawDraftContentState['blocks'][0], 'key'>>;
};
