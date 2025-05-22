import pick from 'lodash/pick';
import { useForm } from 'react-hook-form';

import TaskInput from '@components/inputs/taskInput/TaskInput';
import TaskFormSelect from '@components/select/taskFormSelect/TaskFormSelect';
import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';

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
import { formatDate } from '@common/helpers/dateHelper';
import { DATE_UP_TO_MINUTES } from '@common/utils/dateFormats';

import * as S from './TaskComponent.styled';
import { ITaskComponent, ITaskFormValues } from './TaskComponent.types';

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
    updatedAt,
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
          <S.MetaInfo>
            <S.MetaInfoRow>{`Last updates at: ${formatDate(updatedAt, DATE_UP_TO_MINUTES)}`}</S.MetaInfoRow>
          </S.MetaInfo>
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
      <S.TopRightScrollableContainer>
        <S.TopRight>
          <TaskFormSelect
            items={columnList}
            name="column"
            label={'Column'}
            defaultVal={watch('column')}
            setValue={setValue}
          />
          <TaskFormSelect
            items={taskStatusSchema}
            name="status"
            label={'status'}
            defaultVal={watch('status')}
            setValue={setValue}
          />
          <TaskFormSelect
            items={taskPrioritySchema}
            name="priority"
            label={'Priority'}
            defaultVal={watch('priority')}
            setValue={setValue}
          />
          <TaskFormSelect
            items={taskTypesSchema}
            name="type"
            label={'Type'}
            defaultVal={watch('type')}
            setValue={setValue}
          />
          {watch('type') === 'task' ? (
            <TaskFormSelect
              items={storiesSchema}
              name="parentTask"
              label={'Story'}
              defaultVal={parentTaskItem?.taskId || 0}
              setValue={setValue}
            />
          ) : null}
        </S.TopRight>
      </S.TopRightScrollableContainer>
      <S.Bottom className="task-buttons-section">
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
