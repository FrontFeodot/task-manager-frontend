import Cookies from 'js-cookie';
import { keys } from 'lodash';

import apiHandler from '@common/api/apiHandler';
import { SELECTED_BOARD } from '@common/utils/cookies';
import {
  setBoardLoading,
  setBoardsList,
  setCurrentBoard,
} from '@common/providers/boardProvider/useBoardState';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import {
  getCurrentBoardId,
  setCurrentBoardAction,
} from '@common/helpers/boardHelper';
import { IBoardList } from '@common/interfaces/IBoard';

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

export const createBoard = async (title: string): Promise<ICustomResponse<string | undefined>> => {
  try {
    const response = await apiHandler<string, {title: string}>({
      method: IApiMethod.POST,
      url: ApiCalls.BOARD_CREATE,
      withAuth: true,
      payload: { title },
    });
    if (response.isError) {
      throw response;
    }
    await getBoards();

    return response as ICustomResponse<string>;
  } catch (err) {
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
    return err as ICustomResponse;
  }
};

export const updateDoneColumn = async (
  doneColumn: string | null
): Promise<ICustomResponse<IBoardList>> => {
  const boardId = getCurrentBoardId() as string;

  try {
    const response = await apiHandler<
      IBoardList,
      { boardId: string; doneColumn: string | null }
    >({
      method: IApiMethod.PUT,
      url: ApiCalls.BOARD_UPDATE_DONE_COLUMN,
      withAuth: true,
      payload: { boardId, doneColumn },
    });
    if (response.isError || !response.payload) {
      throw response;
    }
    setBoardsList(response.payload);
    return response;
  } catch (err) {
    return err as ICustomResponse<IBoardList>;
  }
};

export const shareBoard = async (
  boardId: string,
  invitedUserEmail: string
): Promise<ICustomResponse> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.POST,
      url: ApiCalls.BOARD_SHARE,
      withAuth: true,
      payload: { boardId, invitedUserEmail },
    });
    if (!response || response.isError) {
      throw response;
    }
    return response as ICustomResponse;
  } catch (err) {
    return err as ICustomResponse;
  }
};
