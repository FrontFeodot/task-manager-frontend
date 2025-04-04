import upperFirst from 'lodash/upperFirst';
import { useForm } from 'react-hook-form';
import pick from 'lodash/pick';

import TaskInput from '@components/inputs/taskInput/TaskInput';
import TaskFormSelect from '@components/select/taskFormSelect/TaskFormSelect';
import StyledButton from '@components/styledButton/StyledButton';

import {
  getStorySchema,
  taskPrioritySchema,
  taskStatusSchema,
  taskTypesSchema,
} from '@common/utils/tasdDetailsConfig';
import { deleteTask, updateTask } from '@common/api/taskApi';
import { getBoards } from '@common/api/boardApi';
import { getColumn } from '@common/helpers/columnHelper';
import { IColumn } from '@common/providers/boardProvider/types';
import { getParentTask } from '@common/helpers/taskHelper';

import * as S from './TaskComponent.styled';
import { ITaskComponent, ITaskFormValues } from './TaskComponent.types';
import { IButtonColor } from '@components/styledButton/StyledButton.types';

const TaskComponent = ({
  task,
  columnList,
  closeTask,
}: ITaskComponent): JSX.Element => {
  const {
    title,
    description,
    type,
    priority,
    status,
    columnId,
    customFields,
    taskId,
    parentTask,
  } = task;

  const defaultValues: ITaskFormValues = {
    title,
    description,
    type,
    priority,
    status,
    column: (getColumn({ columnId }) as IColumn).title,
    customFields,
    parentTask,
  };

  const { register, handleSubmit, watch, setValue } = useForm<ITaskFormValues>({
    defaultValues,
  });
  const storiesSchema = getStorySchema();
  const parentTaskItem = getParentTask(Number(watch('parentTask')));
  const currentValues = watch();
  const parentTaskTitle = `${parentTaskItem?.taskId ? `№${parentTaskItem?.taskId} |` : ''} ${storiesSchema[parentTaskItem?.taskId || 0].value}`;

  const isFormChanged = Object.keys(defaultValues).some(
    (key) =>
      currentValues[key as keyof ITaskFormValues] !==
      defaultValues[key as keyof ITaskFormValues]
  );

  const onSubmit = async (data: ITaskFormValues) => {
    const response = await updateTask(task, data);
    if (response?.isSuccess) {
      getBoards();
      closeTask();
    }
  };

  const onTaskDelete = async () => {
    const response = await deleteTask(pick(task, ['taskId', 'boardId']));
    if (response?.isSuccess) {
      getBoards();
      closeTask();
    }
  };

  return (
    <S.TaskFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <S.TopLeft>
        <S.TaskSummary>
          <S.TaskSummaryContent>{`Id: ${taskId};`}</S.TaskSummaryContent>
          <S.TaskSummaryContent>Task details</S.TaskSummaryContent>
          {watch('type') === 'task' ? (
            <TaskFormSelect
              title={parentTaskTitle}
              items={storiesSchema}
              name="parentTask"
              label={'Story'}
              defaultVal={parentTaskItem?.taskId || 0}
              register={register}
              setValue={setValue}
            />
          ) : null}
        </S.TaskSummary>
        <TaskInput
          fieldName="title"
          setValue={setValue}
          register={register}
          watch={watch}
        />
        <TaskInput
          setValue={setValue}
          fieldName="description"
          register={register}
          watch={watch}
        />
      </S.TopLeft>
      <S.TopRight>
        <TaskFormSelect
          title={upperFirst(watch('column'))}
          items={columnList}
          name="column"
          label={'Column'}
          defaultVal={watch('column')}
          register={register}
          setValue={setValue}
        />
        <TaskFormSelect
          title={upperFirst(watch('type'))}
          items={taskTypesSchema}
          name="type"
          label={'Type'}
          defaultVal={watch('type')}
          register={register}
          setValue={setValue}
        />
        <TaskFormSelect
          title={upperFirst(watch('status'))}
          items={taskStatusSchema}
          name="status"
          label={'status'}
          defaultVal={watch('status')}
          register={register}
          setValue={setValue}
        />
        <TaskFormSelect
          title={upperFirst(watch('priority'))}
          items={taskPrioritySchema}
          name="priority"
          label={'Priority'}
          defaultVal={watch('priority')}
          register={register}
          setValue={setValue}
        />
      </S.TopRight>
      <S.Bottom>
        <S.ButtonWrapper>
          {isFormChanged ? <StyledButton type="submit" label="save" /> : null}
        </S.ButtonWrapper>

        <S.ButtonWrapper>
          <StyledButton
            type="button"
            label="delete"
            buttonColor={IButtonColor.RED}
            onClick={onTaskDelete}
          />
        </S.ButtonWrapper>
      </S.Bottom>
    </S.TaskFormWrapper>
  );
};

export default TaskComponent;
