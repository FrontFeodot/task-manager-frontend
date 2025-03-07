import { ITask, ITaskFormItem } from '@common/interfaces/ITask';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface ITaskInput extends ITaskFormItem<HTMLInputElement> {
  fieldName: 'title' | 'description';
  setValue: UseFormSetValue<Partial<ITask>>;
  register: UseFormRegister<Partial<ITask>>;
  watch: UseFormWatch<Partial<ITask>>;
  isCreateTask?: boolean;
}
