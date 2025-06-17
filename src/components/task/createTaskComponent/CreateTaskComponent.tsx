import { convertToRaw,EditorState } from 'draft-js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { getColumnTitles } from '@common/helpers/columnHelper';
import { createTaskHandler } from '@common/helpers/taskApiHelper';
import { ITaskPriority, ITaskType } from '@common/interfaces/ITask';
import { IModal } from '@common/providers/appProvider/types';
import { closeModal } from '@common/providers/appProvider/useAppState';
import {
  getStorySchema,
  taskPrioritySchema,
  taskTypesSchema,
} from '@common/utils/tasdDetailsConfig';

import ErrorTooltip from '@components/error/ErrorTooltip.styled';
import TaskDescriptionInput from '@components/inputs/taskDescription/TaskDescription';
import TaskTitle from '@components/inputs/taskTitleInput/TaskTitle';
import CustomSelect from '@components/select/Select';
import StyledButton from '@components/styledButton/StyledButton';

import { ITaskFormValues } from '../taskComponent/TaskComponent.types';
import * as S from './CreateTaskComponent.styled';

const getDefaultDescription = () =>
  JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));

const CreateTaskComponent = (): JSX.Element => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const columns = getColumnTitles();
  const column = searchParams.get('columnName') || columns[0];
  const defaultValues = {
    title: '',
    description: getDefaultDescription(),
    type: ITaskType.TASK,
    parentTask: 0,
    column,
    isDone: false,
    priority: ITaskPriority.LOW,
  };

  const { handleSubmit, watch, setValue } = useForm<ITaskFormValues>({
    defaultValues,
  });
  const isStoryType = watch('type') === ITaskType.STORY;
  const storiesSchema = getStorySchema();

  const handleClose = () => {
    closeModal(IModal.CREATE_TASK);
  };

  const onSubmit = async (data: ITaskFormValues) => {
    if (!data.title) {
      return setError('Title is required');
    }
    setLoading(true);
    const response = await createTaskHandler(data);
    setLoading(false);

    if (response.isError) {
      return setError(response.message);
    }
    if (response.isSuccess) {
      handleClose();
    }
  };

  const formProps = { setValue, isCreateTask: true };

  return (
    <S.TaskForm onSubmit={handleSubmit(onSubmit)}>
      <S.FormItem>
        <TaskTitle {...formProps} watch={watch} />
      </S.FormItem>
      <S.FormItem $isDescription>
        <TaskDescriptionInput setValue={setValue} watch={watch} />
      </S.FormItem>
      <S.FormItem>
        <CustomSelect
          name="type"
          label="Type"
          items={taskTypesSchema}
          {...formProps}
        />
      </S.FormItem>
      {!isStoryType ? (
        <S.FormItem>
          <CustomSelect
            name="parentTask"
            label="Parent task (story)"
            items={storiesSchema}
            {...formProps}
          />
        </S.FormItem>
      ) : null}
      <S.FormItem>
        <CustomSelect
          name="column"
          label="Column"
          items={columns}
          defaultVal={column}
          {...formProps}
        />
      </S.FormItem>
      <S.FormItem>
        <CustomSelect
          name="priority"
          label="Priority"
          items={taskPrioritySchema}
          {...formProps}
        />
      </S.FormItem>
      {error ? <ErrorTooltip $isGlobal>{error}</ErrorTooltip> : null}
      <S.ButtonContainer>
        <StyledButton type="submit" label="Save" isLoading={loading} />
        <StyledButton label="Cancel" onClick={handleClose} />
      </S.ButtonContainer>
    </S.TaskForm>
  );
};

export default CreateTaskComponent;
