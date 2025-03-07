import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import TaskInput from '@components/inputs/taskInput/TaskInput';

import {
  ITask,
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from '@common/interfaces/ITask';
import { getColumns } from '@common/helpers/taskHelper';

import {
  getStorySchema,
  taskPrioritySchema,
  taskStatusSchema,
  taskTypesSchema,
} from '@common/utils/tasdDetailsConfig';
import { closeModal } from '@common/providers/appProvider/useAppState';
import { createTask } from '@common/api/taskApi';
import { getBoard } from '@common/api/getBoard';

import * as S from './CreateTaskForm.styled';
import CustomSelect from '@components/select/Select';
import StyledButton from '@components/styledButton/StyledButton';
import { assign } from 'lodash';

const CreateTaskForm = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const columns = getColumns();
  const column = searchParams.get('columnName') || columns[0];
  const defaultValues = {
    title: '',
    description: '',
    type: ITaskType.TASK,
    parentTask: 0,
    column,
    status: ITaskStatus.TO_DO,
    priority: ITaskPriority.LOW,
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Partial<ITask>>({
    defaultValues,
  });
  const isStoryType = watch('type') === ITaskType.STORY;
  const storiesSchema = getStorySchema();

  const onSubmit = async (data: Partial<ITask>) => {
    console.log(defaultValues, data);
    console.log(assign(defaultValues, data));
    const response = await createTask(data);
    if (response?.message) {
      closeModal();
      getBoard();
    }
  };

  const formProps = { setValue, register, watch, isCreateTask: true };

  return (
    <S.DetailsContainer>
      <S.TaskForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormItem>
          <TaskInput {...formProps} fieldName="title" />
        </S.FormItem>
        <S.FormItem>
          <TaskInput fieldName="description" {...formProps} />
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
            name="status"
            label="Status"
            items={taskStatusSchema}
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
        <S.ButtonContainer>
          <StyledButton label="Save" />
          <StyledButton label="Cancel" onClick={closeModal} />
        </S.ButtonContainer>
      </S.TaskForm>
    </S.DetailsContainer>
  );
};

export default CreateTaskForm;
