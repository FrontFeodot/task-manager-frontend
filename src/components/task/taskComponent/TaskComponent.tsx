import pick from 'lodash/pick';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { deleteTask, updateTask } from '@common/api/taskApi';
import { getColumn } from '@common/helpers/columnHelper';
import { formatDate } from '@common/helpers/dateHelper';
import { getParentTask } from '@common/helpers/taskHelper';
import { ITask } from '@common/interfaces/ITask';
import { IModal } from '@common/providers/appProvider/types';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IColumn } from '@common/providers/boardProvider/types';
import { DATE_UP_TO_MINUTES } from '@common/utils/dateFormats';
import {
  getStorySchema,
  taskPrioritySchema,
  taskTypesSchema,
} from '@common/utils/tasdDetailsConfig';

import TaskDescriptionInput from '@components/inputs/taskDescription/TaskDescription';
import TaskTitle from '@components/inputs/taskTitleInput/TaskTitle';
import TaskFormSelect from '@components/select/taskFormSelect/TaskFormSelect';
import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';

import * as S from './TaskComponent.styled';
import { ITaskComponent, ITaskFormValues } from './TaskComponent.types';

const TaskComponent = ({
  task,
  columnList,
  closeTask,
  setHasUnsavedChanges,
}: ITaskComponent): JSX.Element => {
  const {
    title,
    description,
    type,
    priority,
    columnId,
    customFields,
    taskId,
    parentTask,
    updatedAt,
    isDone,
  } = task;

  const defaultValues: ITaskFormValues = {
    title,
    description,
    type,
    priority,
    column: (getColumn({ columnId }) as IColumn).title,
    customFields,
    parentTask,
    isDone,
  };

  const { register, handleSubmit, watch, setValue } = useForm<ITaskFormValues>({
    defaultValues,
  });

  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);
  const storiesSchema = getStorySchema();
  const parentTaskItem = getParentTask(Number(watch('parentTask')));
  const currentValues = watch();
  const watchIsDone = watch('isDone');

  const isFormChanged =
    isDescriptionChanged ||
    Object.keys(defaultValues).some(
      (key) =>
        currentValues[key as keyof ITaskFormValues] !==
        defaultValues[key as keyof ITaskFormValues]
    );

  useEffect(() => {
    setHasUnsavedChanges(isFormChanged);
  }, [isFormChanged]);

  const onSubmit = async (data: ITaskFormValues) => {
    const response = await updateTask(task, data);
    if (response?.isSuccess) {
      closeTask(true);
    }
  };

  const confirmDelete = () => {
    openModal({
      name: IModal.CONFIRM_MODAL,
      data: {
        title: 'Are you sure want to delete this task?',
        message: 'This action is irreversible.',
        args: [pick(task, ['taskId', 'boardId'])],
        callback: onTaskDelete,
      },
    });
  };

  const onTaskDelete = async (payload: Pick<ITask, 'taskId' | 'boardId'>) => {
    const response = await deleteTask(payload);
    if (response?.isSuccess) {
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
        <TaskTitle setValue={setValue} register={register} watch={watch} />
        <TaskDescriptionInput
          setValue={setValue}
          watch={watch}
          setIsFormChanged={setIsDescriptionChanged}
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
          <S.MarkAsDoneWrapper className="mark-task-as-done">
            <S.MarkAsDoneContent>{`Mark as ${watchIsDone ? 'not done' : 'done'}`}</S.MarkAsDoneContent>
            <S.MarkAsDoneButtonWrapper>
              <StyledButton
                label={watchIsDone ? 'Not done' : 'Done'}
                buttonColor={
                  watchIsDone ? IButtonColor.default : IButtonColor.BLUE
                }
                onClick={() => setValue('isDone', !watchIsDone)}
              />
            </S.MarkAsDoneButtonWrapper>
          </S.MarkAsDoneWrapper>
        </S.TopRight>
      </S.TopRightScrollableContainer>
      <S.Bottom className="task-buttons-section">
        <S.ButtonWrapper>
          {isFormChanged ? (
            <StyledButton
              type="submit"
              label="save"
              buttonColor={IButtonColor.GREEN}
            />
          ) : null}
        </S.ButtonWrapper>

        <S.ButtonWrapper>
          <StyledButton
            label="delete"
            buttonColor={IButtonColor.RED}
            onClick={confirmDelete}
          />
        </S.ButtonWrapper>
      </S.Bottom>
    </S.TaskFormWrapper>
  );
};

export default TaskComponent;
