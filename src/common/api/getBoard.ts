import Cookies from 'js-cookie';
import { keys } from 'lodash';

import apiHandler from '@common/api/apiHandler';
import { SELECTED_BOARD } from '@common/utils/cookies';
import { setBoardsList } from '@common/providers/boardProvider/useBoardState';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { getCurrentBoard } from '@common/helpers/boardHelper';

export const getBoard = async (): Promise<ICustomResponse<
  Record<string, IBoard> | undefined
> | void> => {
  try {
    const response = await apiHandler<Record<string, IBoard>>({
      method: IApiMethod.GET,
      url: ApiCalls.BOARD,
      withAuth: true,
    });
    console.log('boardList', response);
    if (response.isError || !response.payload) {
      throw response;
    }

    const boardList = response.payload;

    setBoardsList(boardList);

    const currentBoard = getCurrentBoard();
    if (!currentBoard) {
      const firstBoardName = boardList[keys(boardList)[0]].name;
      Cookies.set(SELECTED_BOARD, firstBoardName);
    }
  } catch (error) {
    console.error(error);
    return error as ICustomResponse;
  }
};
