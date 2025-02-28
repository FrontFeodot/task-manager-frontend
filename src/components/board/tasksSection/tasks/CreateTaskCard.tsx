import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';

import * as S from './TaskCard.styled';

const CreateTask = (): JSX.Element => {
  return (
    <S.TaskWrapper onClick={() => openModal(IModal.CREATE_TASK)}>
      <S.CreateNewTaskText>Create new task</S.CreateNewTaskText>
    </S.TaskWrapper>
  );
};

export default CreateTask;
