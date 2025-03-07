import TaskInput from '@components/inputs/taskInput/TaskInput';
import * as S from './TaskComponent.styled';
import { ITaskComponent } from './TaskComponent.types';
import { useForm } from 'react-hook-form';
import { ITask } from '@common/interfaces/ITask';
import { getParentTask } from '@common/helpers/taskHelper';
import TaskFormSelect from '@components/select/taskFormSelect/TaskFormSelect';
import StyledButton from '@components/styledButton/StyledButton';
import {
  getStorySchema,
  taskPrioritySchema,
  taskStatusSchema,
  taskTypesSchema,
} from '@common/utils/tasdDetailsConfig';
import { assign, upperFirst } from 'lodash';
import { format } from 'date-fns';
import { DATE_UP_TO_MINUTES } from '@common/utils/dateFormats';
import { formatDate } from '@common/helpers/dateHelper';
import { updateTask } from '@common/api/taskApi';
import { getBoard } from '@common/api/getBoard';

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
    column,
    customFields,
    createdAt,
    updatedAt,
    taskId,
    parentTask,
  } = task;

  const defaultValues: Partial<ITask> = {
    title,
    description,
    type,
    priority,
    status,
    column,
    customFields,
    parentTask,
  };

  const { register, handleSubmit, watch, setValue } = useForm<Partial<ITask>>({
    defaultValues,
  });
  const storiesSchema = getStorySchema();
  const parentTaskItem = getParentTask(Number(watch('parentTask')));
  const currentValues = watch();
  const parentTaskTitle = `${parentTaskItem?.taskId ? `№${parentTaskItem?.taskId} |` : ''} ${storiesSchema[parentTaskItem?.taskId || 0].value}`;

  const isFormChanged = Object.keys(defaultValues).some(
    (key) =>
      currentValues[key as keyof Partial<ITask>] !==
      defaultValues[key as keyof Partial<ITask>]
  );

  const onSubmit = async (data: Partial<ITask>) => {
    const fullyfiledTaskData = assign(task, data);
    const response = await updateTask(fullyfiledTaskData);
    if (response?.isSuccess) {
      getBoard();
      closeTask();
    }
  };
  return (
    <S.TaskFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <S.TopLeft>
        <S.TaskSummary>
          <S.TaskSummaryContent>{`Id: ${taskId};`}</S.TaskSummaryContent>
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
        <S.SaveButtonWrapper>
          {isFormChanged ? <StyledButton type="submit" label="save" /> : null}
        </S.SaveButtonWrapper>
        <S.MetaInfo>
          <S.MetaInfoRow>{`Created at: ${formatDate(createdAt, DATE_UP_TO_MINUTES)}`}</S.MetaInfoRow>
          <S.MetaInfoRow>{`Updated at: ${formatDate(updatedAt, DATE_UP_TO_MINUTES)}`}</S.MetaInfoRow>
        </S.MetaInfo>
      </S.Bottom>
    </S.TaskFormWrapper>
  );
};

export default TaskComponent;
