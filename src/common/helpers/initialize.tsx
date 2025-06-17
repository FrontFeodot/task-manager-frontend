import Cookies from 'js-cookie';

import { getProtected } from '@common/api/auth';
import pingApi from '@common/api/ping';
import {
  setAppError,
  toggleAppLoading,
} from '@common/providers/appProvider/useAppState';
import { setCurrentBoard } from '@common/providers/boardProvider/useBoardState';
import { SELECTED_BOARD } from '@common/utils/cookies';

const pingPong = async () => {
  toggleAppLoading(true);
  const response = await pingApi();

  if (response === 'success') {
    toggleAppLoading(false);
    return;
  }
  setAppError(response);
  setTimeout(() => {
    setAppError(null);
    toggleAppLoading(false);
  }, 5000);
};

const initialize = () => {
  pingPong();

  const boardFromCookie = Cookies.get(SELECTED_BOARD);
  if (boardFromCookie) {
    setCurrentBoard(boardFromCookie);
  }
  getProtected();
};

export default initialize;
