import Cookies from 'js-cookie';

import { SELECTED_BOARD } from '@common/utils/cookies';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

export const getCurrentBoardTitle = (): string => {
  return Cookies.get(SELECTED_BOARD) || '';
};

export const getCurrentBoardId = (): string => {
  const currentBoard = getCurrentBoardTitle();
  return useBoardState.getState().boardList?.[currentBoard]?.boardId as string;
};
