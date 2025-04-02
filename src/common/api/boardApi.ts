import Cookies from 'js-cookie';
import { keys } from 'lodash';

import apiHandler from '@common/api/apiHandler';
import { SELECTED_BOARD } from '@common/utils/cookies';
import {
  setBoardsList,
  setCurrentBoard,
} from '@common/providers/boardProvider/useBoardState';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import {
  getCurrentBoardId,
  getCurrentBoardTitle,
  setCurrentBoardAction,
} from '@common/helpers/boardHelper';
import { IBoardList } from '@common/interfaces/IBoard';

export const getBoards = async (): Promise<ICustomResponse<
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
      setCurrentBoardAction(firstBoardName);
    }
  } catch (error) {
    console.error(error);
    return error as ICustomResponse;
  }
};

export const createBoard = async (title: string): Promise<ICustomResponse> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.POST,
      url: ApiCalls.BOARD_CREATE,
      withAuth: true,
      payload: { title },
    });
    if (response.isError) {
      throw response;
    }
    await getBoards();
    return response as ICustomResponse;
  } catch (err) {
    console.error(err);
    return err as ICustomResponse;
  }
};

export const updateBoardTitle = async (payload: {
  boardId: string;
  title: string;
}): Promise<ICustomResponse> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.PUT,
      url: ApiCalls.BOARD_UPDATE_TITLE,
      withAuth: true,
      payload,
    });
    if (response.isError) {
      throw response;
    }
    await getBoards();
    return response as ICustomResponse;
  } catch (err) {
    console.error(err);
    return err as ICustomResponse;
  }
};
export const deleteBoard = async (
  boardId: string
): Promise<ICustomResponse> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.DELETE,
      url: ApiCalls.BOARD_DELETE,
      withAuth: true,
      payload: { boardId },
    });
    if (response.isError) {
      throw response;
    }
    const currentBoardId = getCurrentBoardId();

    if (currentBoardId === boardId && !!Cookies.get(SELECTED_BOARD)) {
      Cookies.remove(SELECTED_BOARD);
    }

    setCurrentBoard(null);
    await getBoards();
    return response as ICustomResponse;
  } catch (err) {
    console.error(err);
    return err as ICustomResponse;
  }
};
