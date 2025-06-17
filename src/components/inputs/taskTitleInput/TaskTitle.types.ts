import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { IFormItem } from '@common/interfaces/ITask';

import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';

export interface ITaskInput
  extends IFormItem<HTMLInputElement, ITaskFormValues> {
  isCreateTask?: boolean;
  setValue: UseFormSetValue<ITaskFormValues>;
  watch: UseFormWatch<ITaskFormValues>;
}
