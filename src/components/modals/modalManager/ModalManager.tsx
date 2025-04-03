import CreateTaskModal from '@components/modals/createTaskModal/CreateTaskModal';
import TaskModal from '@components/modals/taskModal/TaskModal';

import { useAppState } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';

import * as S from './ModalManager.styled';
import { useEffect } from 'react';
import DeleteColumnModal from '../deleteColumnConfirm/DeleteColumnModal';
import ConfirmModal from '../confirmModal/ConfirmModal';

const ModalManager = (): JSX.Element | null => {
  const currentModal = useAppState((s) => s.currentModal);

  if (!currentModal) {
    return null;
  }

  const { name } = currentModal;

  const ModalComponent = () => {
    switch (name) {
      case IModal.TASK_MODAL:
        return <TaskModal />;
      case IModal.CREATE_TASK:
        return <CreateTaskModal />;
      case IModal.DELETE_COLUMN_CONFIRM:
        return <DeleteColumnModal />;
      case IModal.CONFIRM_MODAL:
        return <ConfirmModal />;
      default:
        return <></>;
    }
  };

  return (
    <S.ModalWrapper>
      <ModalComponent />
    </S.ModalWrapper>
  );
};

export default ModalManager;
