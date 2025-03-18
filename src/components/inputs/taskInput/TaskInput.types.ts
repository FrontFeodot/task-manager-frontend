import { ITask, ITaskFormItem } from '@common/interfaces/ITask';
import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface ITaskInput extends ITaskFormItem<HTMLInputElement> {
  fieldName: 'title' | 'description';
  setValue: UseFormSetValue<ITaskFormValues>;
  register: UseFormRegister<ITaskFormValues>;
  watch: UseFormWatch<ITaskFormValues>;
  isCreateTask?: boolean;
}
