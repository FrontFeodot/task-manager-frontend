import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { ITask } from '@common/interfaces/ITask';
import { getCurrentBoard } from '@common/helpers/boardHelper';

import apiHandler from './apiHandler';

interface ICreateTask {
  message: string;
}

export const createTask = async (
  task: Partial<ITask>
): Promise<ICustomResponse> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.POST,
      url: ApiCalls.TASK_CREATE,
      payload: {
        ...task,
        board: getCurrentBoard(),
      },
      withAuth: true,
    });

    if (response.isError) {
      throw response;
    }
    return response as ICustomResponse;
  } catch (err) {
    console.error(err);
    return err as ICustomResponse;
  }
};

export const updateTask = async (
  task: Partial<ITask>
): Promise<ICustomResponse> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.PUT,
      url: ApiCalls.TASK_UPDATE,
      payload: {
        ...task,
        board: getCurrentBoard(),
      },
      withAuth: true,
    });
    if (response.isError) {
      throw response;
    }
    return response as ICustomResponse;
  } catch (err) {
    console.error(err);
    return err as ICustomResponse;
  }
};
