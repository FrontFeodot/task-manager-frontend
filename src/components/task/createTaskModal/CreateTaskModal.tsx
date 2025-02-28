import { useRef } from 'react';
import useOutsideClick from '@common/hooks/useOutSideClick';
import { closeModal } from '@common/providers/appProvider/useAppState';

import CreateTaskForm from '../createTaskForm/CreateTaskForm';
import * as S from './CreateTaskModal.styled';

const CreateTaskModal = (): JSX.Element => {
  const ref = useRef(null);

  useOutsideClick(ref, closeModal);

  return (
    <S.CreateTaskModal ref={ref}>
      <CreateTaskForm />
    </S.CreateTaskModal>
  );
};

export default CreateTaskModal;
