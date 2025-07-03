import Cookies from 'js-cookie';
import { find } from 'lodash';

import { getSingleBoard } from '@common/api/boardApi';
import { joinBoard } from '@common/api/socket/socketEvents/boardEvents';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  setCurrentBoard,
  useBoardState,
} from '@common/providers/boardProvider/useBoardState';
import { useUserState } from '@common/providers/userProvider/useUserState';
import { SELECTED_BOARD } from '@common/utils/cookies';

export const getBoardById = (boardId: string): IBoard | undefined => {
  const { boardList } = useBoardState.getState();
  return find(boardList, (board) => board.boardId === boardId);
};

export const getCurrentBoardId = (): string | undefined => {
  const { currentBoardId, boardList } = useBoardState.getState();

  if (currentBoardId && boardList && boardList[currentBoardId]) {
    return currentBoardId;
  }
};

export const getCurrentBoardData = (): IBoard | undefined => {
  const currentBoard = getCurrentBoardId();
  if (currentBoard) {
    return useBoardState.getState().boardList?.[currentBoard];
  }
};

export const getCurrentBoardTitle = (): string => {
  const currentBoard = getCurrentBoardData();
  return currentBoard?.title as string;
};

export const setCurrentBoardAction = async (
  boardId: string,
  fetchData = false
): Promise<void> => {
  joinBoard(boardId);
  setCurrentBoard(boardId);
  Cookies.set(SELECTED_BOARD, boardId);
  if (fetchData) {
    await getSingleBoard(boardId);
  }
};

export const isBoardOwner = (ownerEmail: string): boolean => {
  return useUserState.getState().data?.email === ownerEmail;
};
