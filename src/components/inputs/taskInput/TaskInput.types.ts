import { IFormItem } from '@common/interfaces/ITask';
import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface ITaskInput
  extends IFormItem<HTMLInputElement, ITaskFormValues> {
  fieldName: 'title' | 'description';
  isCreateTask?: boolean;
  setValue: UseFormSetValue<ITaskFormValues>;
  watch: UseFormWatch<ITaskFormValues>;
}
