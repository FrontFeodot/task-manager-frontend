import { ApiCalls, IApiMethod } from '@common/interfaces/IApiHandler';
import apiHandler from './apiHandler';
import CustomError from './error';
import Cookies from 'js-cookie';
import { AUTH_TOKEN, SELECTED_BOARD } from '@common/utils/cookies';
import { setBoardsList } from '@common/providers/boardProvider/useBoardState';
import { keys } from 'lodash';
import { IBoard } from '@common/providers/boardProvider/types';

export const getBoard = async (): Promise<CustomError | void> => {
  const token = Cookies.get(AUTH_TOKEN);
  console.log(token);
  try {
    const boardList = await apiHandler<Record<string, IBoard>>({
      method: IApiMethod.GET,
      url: ApiCalls.BOARD,
      withAuth: true,
    });
    if (boardList instanceof CustomError) {
      throw boardList;
    }
    console.log('getBoard', boardList);

    setBoardsList(boardList);

    const currentBoard = Cookies.get(SELECTED_BOARD);
    if (!currentBoard) {
      const firstBoardName = boardList[keys(boardList)[0]].name;
      Cookies.set(SELECTED_BOARD, firstBoardName);
    }
  } catch (error) {
    console.error(error);
    return error as CustomError;
  }
};
