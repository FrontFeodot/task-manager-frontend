import { useEffect, useRef } from 'react';

import { removeSearchParam } from '@common/helpers/searchParamsHelper';
import useOutsideClick from '@common/hooks/useOutSideClick';
import { IModal } from '@common/providers/appProvider/types';
import { closeModal } from '@common/providers/appProvider/useAppState';

import CreateTaskComponent from '../../task/createTaskComponent/CreateTaskComponent';
import CloseModalIcon from '../closeModalIcon/CloseModalIcon';
import * as S from './CreateTaskModal.styled';

const CreateTaskModal = (): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    return () => {
      removeSearchParam('columnName');
    };
  }, []);

  const handleClose = () => {
    closeModal(IModal.CREATE_TASK);
  };

  useOutsideClick(ref, handleClose);

  return (
    <S.CreateTaskModal ref={ref}>
      <CloseModalIcon closeHandler={handleClose} />

      <CreateTaskComponent />
    </S.CreateTaskModal>
  );
};

export default CreateTaskModal;
