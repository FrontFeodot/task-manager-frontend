import { getProtected } from '@common/api/auth';
import { setCurrentBoard } from '@common/providers/boardProvider/useBoardState';
import { SELECTED_BOARD } from '@common/utils/cookies';
import Cookies from 'js-cookie';

const initialize = () => {
  const boardFromCookie = Cookies.get(SELECTED_BOARD);
  if (boardFromCookie) {
    setCurrentBoard(boardFromCookie);
  }
  getProtected();
};

export default initialize;
