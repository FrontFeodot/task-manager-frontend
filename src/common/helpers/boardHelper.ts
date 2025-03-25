import Cookies from 'js-cookie';

import { SELECTED_BOARD } from '@common/utils/cookies';
import {
  setCurrentBoard,
  useBoardState,
} from '@common/providers/boardProvider/useBoardState';
import { IBoard } from '@common/providers/boardProvider/types';
import { find } from 'lodash';

export const getBoardById = (boardId: string): IBoard | undefined => {
  const { boardList } = useBoardState.getState();
  return find(boardList, (board) => board.boardId === boardId);
};

export const getCurrentBoardTitle = (): string | undefined => {
  const { currentBoardTitle, boardList } = useBoardState.getState();

  if (currentBoardTitle && boardList && boardList[currentBoardTitle]) {
    return currentBoardTitle;
  }
};

export const getCurrentBoardData = (): IBoard | undefined => {
  const currentBoard = getCurrentBoardTitle();
  if (currentBoard) {
    return useBoardState.getState().boardList?.[currentBoard];
  }
};

export const getCurrentBoardId = (): string => {
  const currentBoard = getCurrentBoardData();
  return currentBoard?.boardId as string;
};

export const setCurrentBoardAction = (boardTitle: string): void => {
  setCurrentBoard(boardTitle);
  Cookies.set(SELECTED_BOARD, boardTitle);
};
