import { ISchema } from '@common/utils/tasdDetailsConfig';
import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface IStorySelect {
  items: ISchema | string[];
  name: keyof ITaskFormValues;
  label: string;
  title?: string;
  register: UseFormRegister<ITaskFormValues>;
  setValue: UseFormSetValue<ITaskFormValues>;
  defaultVal?: string | number;
}
