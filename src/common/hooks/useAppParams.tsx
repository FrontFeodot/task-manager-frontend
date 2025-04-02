import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { IModal } from '@common/providers/appProvider/types';
import {
  closeModal,
  openModal,
  useAppState,
} from '@common/providers/appProvider/useAppState';
import { useUserState } from '@common/providers/userProvider/useUserState';
import Cookies from 'js-cookie';
import { AUTH_TOKEN } from '@common/utils/cookies';

const useAppParams = (): void => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasSelectedTask = !!searchParams.get('taskId');
  const isTaskOpened = useAppState(
    (s) => s.currentModal?.name === IModal.TASK_MODAL
  );

  const isLoggedIn =
    useUserState((s) => s.isLoggedIn) || !!Cookies.get(AUTH_TOKEN);

  useEffect(() => {
    if (hasSelectedTask && !isTaskOpened) {
      openModal({ name: IModal.TASK_MODAL });
    }
    if (!hasSelectedTask && isTaskOpened) {
      closeModal();
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoggedIn && pathname === '/board') {
      navigate('/');
    }
  }, [isLoggedIn]);
};

export default useAppParams;
