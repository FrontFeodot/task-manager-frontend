import CreateTaskModal from '@components/task/createTaskModal/CreateTaskModal';
import TaskModal from '@components/task/taskModal/TaskModal';

import { useAppState } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';

import * as S from './ModalManager.styled';

const ModalManager = (): JSX.Element | null => {
  const currentModal = useAppState((s) => s.currentModal);

  if (!currentModal) {
    return null;
  }

  const ModalComponent = () => {
    switch (currentModal) {
      case IModal.TASK_MODAL:
        return <TaskModal />;
      case IModal.CREATE_TASK:
        return <CreateTaskModal />;
      default:
        return <></>;
    }
  };

  return (
    <S.ModalWrapper /* onClick={closeModal} */>
      <ModalComponent />
    </S.ModalWrapper>
  );
};

export default ModalManager;
