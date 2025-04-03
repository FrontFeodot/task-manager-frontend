import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { ITask } from '@common/interfaces/ITask';
import {
  getCurrentBoardTitle,
  getCurrentBoardId,
} from '@common/helpers/boardHelper';

import apiHandler from './apiHandler';
import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import { assign, omit } from 'lodash';
import { getColumn } from '@common/helpers/columnHelper';
import { getLastOrderByType } from '@common/helpers/taskHelper';
import { IColumn } from '@common/providers/boardProvider/types';
import { getBoards } from './boardApi';
import { IDeleteTask } from '@common/interfaces/IColumn';

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
    const response = await apiHandler({
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
