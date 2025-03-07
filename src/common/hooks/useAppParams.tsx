import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IModal } from '@common/providers/appProvider/types';
import {
  closeModal,
  openModal,
  useAppState,
} from '@common/providers/appProvider/useAppState';

const useAppParams = (): void => {
  const [searchParams] = useSearchParams();
  const hasSelectedTask = !!searchParams.get('taskId');
  const isTaskOpened = useAppState((s) => s.currentModal === IModal.TASK_MODAL);

  useEffect(() => {
    if (hasSelectedTask && !isTaskOpened) {
      openModal(IModal.TASK_MODAL);
    }
    if (!hasSelectedTask && isTaskOpened) {
      closeModal();
    }
  }, [searchParams]);
};

export default useAppParams;
