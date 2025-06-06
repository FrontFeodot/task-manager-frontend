import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import {
  getCurrentBoardId,
} from '@common/helpers/boardHelper';
import { IColumn } from '@common/providers/boardProvider/types';
import { IDeleteTask } from '@common/interfaces/IColumn';

import apiHandler from './apiHandler';
import { getBoards } from './boardApi';

export const createColumnApi = async (
  column: Partial<IColumn>
): Promise<ICustomResponse> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.POST,
      url: ApiCalls.COLUMN_CREATE,
      payload: {
        ...column,
      },
      withAuth: true,
    });

    if (response.isError) {
      throw response;
    }
    return response as ICustomResponse;
  } catch (err) {
    return err as ICustomResponse;
  }
};

export const updateColumn = async (
  data: Partial<IColumn>
): Promise<ICustomResponse> => {
  const boardId = getCurrentBoardId();
  const payload = { ...data, boardId };
  try {
    const response = await apiHandler({
      method: IApiMethod.PUT,
      url: ApiCalls.COLUMN_UPDATE,
      payload,
      withAuth: true,
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

export const deleteColumn = async (payload: IDeleteTask) => {
  try {
    const response = await apiHandler<undefined, IDeleteTask>({
      method: IApiMethod.DELETE,
      url: ApiCalls.COLUMN_DELETE,
      payload,
      withAuth: true,
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
