import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';

import * as S from './TaskCard.styled';
import { useSearchParams } from 'react-router-dom';

const CreateTask = ({ columnName }: { columnName: string }): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams();

  const handleClick = () => {
    newSearchParams.set('columnName', columnName);
    setSearchParams(newSearchParams);
    openModal({ name: IModal.CREATE_TASK });
  };

  return (
    <S.TaskWrapper onClick={handleClick}>
      <S.CreateNewTaskText>Create new task</S.CreateNewTaskText>
    </S.TaskWrapper>
  );
};

export default CreateTask;
