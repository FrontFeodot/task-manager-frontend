import React from 'react';

import useAppParams from '@common/hooks/useAppParams';
import { IModal, IModalProps } from '@common/providers/appProvider/types';
import { useAppState } from '@common/providers/appProvider/useAppState';

import CreateTaskModal from '@components/modals/createTaskModal/CreateTaskModal';
import TaskModal from '@components/modals/taskModal/TaskModal';

import ConfirmModal from '../confirmModal/ConfirmModal';
import DeleteColumnModal from '../deleteColumnConfirm/DeleteColumnModal';
import * as S from './ModalManager.styled';

const ModalRouter = ({ name }: { name: IModal }): JSX.Element | null => {
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
      return null;
  }
};

const ModalItem = React.memo(
  ({ modal, index }: { modal: IModalProps; index: number }) => {
    return (
      <S.ModalWrapper $index={index}>
        <ModalRouter name={modal.name} />
      </S.ModalWrapper>
    );
  },
  (prevProps, nextProps) => prevProps.modal.name === nextProps.modal.name
);

const ModalManager = (): JSX.Element | null => {
  const modals = useAppState((s) => s.modals);

  useAppParams();

  if (!modals.length) {
    return null;
  }

  return (
    <S.ModalListWrapper>
      {modals.map((modal, index) => (
        <ModalItem key={modal.name} modal={modal} index={index} />
      ))}
    </S.ModalListWrapper>
  );
};

export default React.memo(ModalManager);
