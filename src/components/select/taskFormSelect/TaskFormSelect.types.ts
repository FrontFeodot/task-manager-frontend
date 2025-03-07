import { ITask } from '@common/interfaces/ITask';
import { ISchema } from '@common/utils/tasdDetailsConfig';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface IStorySelect {
  items: ISchema | string[];
  name: keyof Partial<ITask>;
  label: string;
  title?: string;
  register: UseFormRegister<Partial<ITask>>;
  setValue: UseFormSetValue<Partial<ITask>>;
  defaultVal?: string | number;
}
