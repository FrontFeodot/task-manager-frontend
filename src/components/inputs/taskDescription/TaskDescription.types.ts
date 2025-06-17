import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';

export interface ITaskDescription {
  setValue: UseFormSetValue<ITaskFormValues>;
  watch: UseFormWatch<ITaskFormValues>;
  setIsFormChanged?: Dispatch<SetStateAction<boolean>>;
}

export interface IEditorRef {
  focus: () => void;
}
