import { useForm } from 'react-hook-form';

import TaskInput from '@components/inputs/taskInput/TaskInput';

import { ITask, ITaskType } from '@common/interfaces/ITask';
import { getColumns } from '@common/helpers/taskHelper';

import {
  getStorySchema,
  taskPrioritySchema,
  taskStatusSchema,
  taskTypesSchema,
} from '@common/utils/tasdDetailsConfig';
import { closeModal } from '@common/providers/appProvider/useAppState';
import createTask from '@common/api/postCreateTask';
import { getBoard } from '@common/api/getBoard';

import * as S from './CreateTaskForm.styled';
import CustomSelect from '@components/select/Select';
import StyledButton from '@components/styledButton/StyledButton';

const CreateTaskForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Partial<ITask>>({});
  const isStoryType = watch('type') === ITaskType.STORY;
  const storiesSchema = getStorySchema();

  const columns = getColumns();

  const onSubmit = async (data: Partial<ITask>) => {
    const response = await createTask(data);
    console.log(response);
    if (response?.message) {
      closeModal();
      getBoard();
    }
  };

  return (
    <S.DetailsContainer>
      <S.TaskForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormItem>
          <TaskInput
            fieldName="name"
            setValue={setValue}
            register={register}
            watch={watch}
          />
        </S.FormItem>
        <S.FormItem>
          <TaskInput
            setValue={setValue}
            fieldName="description"
            register={register}
            watch={watch}
          />
        </S.FormItem>
        <S.FormItem>
          <CustomSelect
            name="type"
            items={taskTypesSchema}
            setValue={setValue}
            register={register}
            watch={watch}
          />
        </S.FormItem>
        {!isStoryType ? (
          <S.FormItem>
            <CustomSelect
              name="parentTask"
              label="Parent task (story)"
              items={storiesSchema}
              setValue={setValue}
              register={register}
              watch={watch}
            />
          </S.FormItem>
        ) : null}
        <S.FormItem>
          <CustomSelect
            name="column"
            label="Column"
            items={columns}
            setValue={setValue}
            register={register}
            watch={watch}
          />
        </S.FormItem>
        <S.FormItem>
          <CustomSelect
            name="status"
            items={taskStatusSchema}
            setValue={setValue}
            register={register}
            watch={watch}
          />
        </S.FormItem>
        <S.FormItem>
          <CustomSelect
            name="priority"
            items={taskPrioritySchema}
            setValue={setValue}
            register={register}
            watch={watch}
          />
        </S.FormItem>
        <S.FormItem></S.FormItem>
        <S.ButtonContainer>
          <StyledButton label="Save" />
          <StyledButton label="Cancel" onClick={closeModal} />
        </S.ButtonContainer>
      </S.TaskForm>
    </S.DetailsContainer>
  );
};

export default CreateTaskForm;
