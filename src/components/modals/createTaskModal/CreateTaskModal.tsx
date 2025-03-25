import { useEffect, useRef } from 'react';
import useOutsideClick from '@common/hooks/useOutSideClick';
import { closeModal } from '@common/providers/appProvider/useAppState';

import CreateTaskForm from '../../task/createTaskForm/CreateTaskForm';
import * as S from './CreateTaskModal.styled';
import { removeSearchParam } from '@common/helpers/searchParamsHelper';

const CreateTaskModal = (): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    return () => {
      removeSearchParam('columnName');
    };
  }, []);

  useOutsideClick(ref, closeModal);

  return (
    <S.CreateTaskModal ref={ref}>
      <CreateTaskForm />
    </S.CreateTaskModal>
  );
};

export default CreateTaskModal;
