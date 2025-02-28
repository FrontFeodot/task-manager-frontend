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

const createTask = async (
  task: Partial<ITask>
): Promise<ICustomResponse<ICreateTask>> => {
  try {
    const response = await apiHandler<ICreateTask>({
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
    return response;
  } catch (err) {
    console.error(err);
    return err as ICustomResponse<ICreateTask>;
  }
};

export default createTask;
