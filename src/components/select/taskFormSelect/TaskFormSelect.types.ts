import { UseFormSetValue } from 'react-hook-form';

import { ISchema } from '@common/utils/tasdDetailsConfig';

import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';

export interface IStorySelect {
  items: ISchema | string[];
  name: keyof ITaskFormValues;
  label: string;
  setValue: UseFormSetValue<ITaskFormValues>;
  defaultVal?: string | number;
}
