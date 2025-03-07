import { ITask, ITaskFormItem } from '@common/interfaces/ITask';
import { ISchema } from '@common/utils/tasdDetailsConfig';
import { RefObject } from 'react';

export interface ISelect extends ITaskFormItem<HTMLSelectElement> {
  items: ISchema | string[];
  name: keyof Partial<ITask>;
  defaultVal?: string | number;
  label: string;
  selectRef?: RefObject<HTMLSelectElement>;
  isCreateTask?: boolean;
}
