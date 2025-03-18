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
import { getCurrentBoardTitle } from '@common/helpers/boardHelper';
import { IBoardList } from '@common/interfaces/IBoard';

export const getBoard = async (): Promise<ICustomResponse<
  IBoardList | undefined
> | void> => {
  try {
    const response = await apiHandler<IBoardList>({
      method: IApiMethod.GET,
      url: ApiCalls.BOARD,
      withAuth: true,
    });
    if (response.isError || !response.payload) {
      throw response;
    }

    const boardList = response.payload;

    setBoardsList(boardList);

    const currentBoard = getCurrentBoardTitle();
    if (!currentBoard) {
      const firstBoardName = boardList[keys(boardList)[0]].title;
      Cookies.set(SELECTED_BOARD, firstBoardName);
    }
  } catch (error) {
    console.error(error);
    return error as ICustomResponse;
  }
};
