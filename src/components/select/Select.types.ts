import { RefObject } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { ISchema } from '@common/utils/tasdDetailsConfig';

import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';

export interface ISelect {
  items: ISchema | string[];
  name: keyof ITaskFormValues;
  defaultVal?: string | number;
  label: string;
  selectRef?: RefObject<HTMLDivElement>;
  isCreateTask?: boolean;
  setValue?: UseFormSetValue<ITaskFormValues>;
  handleChange?: (value?: string | number) => void;
  handleOutsideClick?: () => void;
}
