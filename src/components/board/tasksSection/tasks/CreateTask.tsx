import createTask from '@common/api/postCreateTask';
import * as S from './Task.styled';

const CreateTask = (): JSX.Element => {
  return (
    <S.TaskWrapper>
      <S.CreateNewTaskText onClick={createTask}>
        Create new task
      </S.CreateNewTaskText>
    </S.TaskWrapper>
  );
};

export default CreateTask;
