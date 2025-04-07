import apiHandler from '@common/api/apiHandler';
import { setBoardsList } from '@common/providers/boardProvider/useBoardState';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { IUpdateColumnOrder, IUpdateTaskOrder } from '@common/interfaces/IDnd';
import { IBoardList } from '@common/interfaces/IBoard';

export const updateTaskOrder = async (
  tasksToUpdate: IUpdateTaskOrder[]
): Promise<ICustomResponse<IBoardList>> => {
  try {
    const response = await apiHandler<
      IBoardList,
      { tasksToUpdate: IUpdateTaskOrder[] }
    >({
      method: IApiMethod.PUT,
      url: ApiCalls.UPDATE_TASKS_ORDER,
      payload: { tasksToUpdate },
      withAuth: true,
    });
    if (response.isError || !response.payload) {
      throw response;
    }

    const boardList = response.payload;

    setBoardsList(boardList);
    return response;
  } catch (error) {
    return error as ICustomResponse<IBoardList>;
  }
};

export const updateColumnOrder = async (
  payload: IUpdateColumnOrder
): Promise<ICustomResponse<IBoardList>> => {
  try {
    const response = await apiHandler<IBoardList, IUpdateColumnOrder>({
      method: IApiMethod.PUT,
      url: ApiCalls.UPDATE_COLUMNS_ORDER,
      payload,
      withAuth: true,
    });
    if (response.isError || !response.payload) {
      throw response;
    }

    const boardList = response.payload;

    setBoardsList(boardList);
    return response;
  } catch (error) {
    return error as ICustomResponse<IBoardList>;
  }
};
