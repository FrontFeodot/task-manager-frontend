import Cookies from 'js-cookie';
import { keys } from 'lodash';

import apiHandler from '@common/api/apiHandler';
import {
  getCurrentBoardId,
  setCurrentBoardAction,
} from '@common/helpers/boardHelper';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { IBoardList } from '@common/interfaces/IBoard';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  setBoardLoading,
  setBoardsList,
  setCurrentBoard,
} from '@common/providers/boardProvider/useBoardState';
import { SELECTED_BOARD } from '@common/utils/cookies';

export const getBoards = async (): Promise<ICustomResponse<
  IBoardList | undefined
> | void> => {
  try {
    setBoardLoading(true);
    const response = await apiHandler<IBoardList, { email: string }>({
      method: IApiMethod.GET,
      url: ApiCalls.BOARD,
      withAuth: true,
    });
    if (response.isError || !response.payload) {
      throw response;
    }

    const boardList = response.payload;

    setBoardsList(boardList);

    const currentBoard = getCurrentBoardId();

    if (!currentBoard) {
      const firstBoardId = boardList[keys(boardList)[0]].boardId;
      setCurrentBoardAction(firstBoardId);
    }
    setBoardLoading(false);
  } catch (error) {
    setBoardLoading(false);

    return error as ICustomResponse;
  }
};

export const createBoard = async (
  title: string
): Promise<ICustomResponse<IBoard | undefined>> => {
  try {
    const response = await apiHandler<IBoard, { title: string }>({
      method: IApiMethod.POST,
      url: ApiCalls.BOARD_CREATE,
      withAuth: true,
      payload: { title },
    });
    if (response.isError) {
      throw response;
    }
    await getBoards();

    return response as ICustomResponse<IBoard>;
  } catch (err) {
    return err as ICustomResponse;
  }
};

export const deleteBoardApi = async (
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
    return err as ICustomResponse;
  }
};
