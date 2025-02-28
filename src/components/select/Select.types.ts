import { ITaskFormItem } from '@common/interfaces/ITask';

export interface ISelect extends ITaskFormItem<HTMLSelectElement> {
  items: Record<string, string> | string[];
  name: string;
  label?: string;
}
