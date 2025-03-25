import { ITask, IFormItem } from '@common/interfaces/ITask';
import { ISchema } from '@common/utils/tasdDetailsConfig';
import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import { RefObject } from 'react';

export interface ISelect extends IFormItem<HTMLSelectElement, ITaskFormValues> {
  items: ISchema | string[];
  name: keyof ITaskFormValues;
  defaultVal?: string | number;
  label: string;
  selectRef?: RefObject<HTMLSelectElement>;
  isCreateTask?: boolean;
}
