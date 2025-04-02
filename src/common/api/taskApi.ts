import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { ITask } from '@common/interfaces/ITask';
import { getCurrentBoardId } from '@common/helpers/boardHelper';

import apiHandler from './apiHandler';
import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import { assign, omit } from 'lodash';
import { getColumn } from '@common/helpers/columnHelper';
import { getLastOrderByType } from '@common/helpers/taskHelper';

export const createTaskApi = async (
  task: Partial<ITask>
): Promise<ICustomResponse> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.POST,
      url: ApiCalls.TASK_CREATE,
      payload: {
        ...task,
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
  oldTask: Partial<ITask>,
  formValues: ITaskFormValues
): Promise<ICustomResponse> => {
  const columnId = getColumn({ columnTitle: formValues.column })?.columnId;
  const parsedFormFields = omit(formValues, ['column', 'board']);
  const boardId = getCurrentBoardId();
  const order =
    oldTask.columnId === columnId
      ? oldTask.order
      : getLastOrderByType({ type: 'tasks', columnId, boardId });
  const updatedTask = {
    ...assign(oldTask, parsedFormFields),
    order,
    boardId,
    columnId,
  };
  try {
    const response = await apiHandler({
      method: IApiMethod.PUT,
      url: ApiCalls.TASK_UPDATE,
      payload: {
        ...updatedTask,
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

export const deleteTask = async (
  payload: Pick<ITask, 'taskId' | 'boardId'>
) => {
  try {
    const response = await apiHandler({
      method: IApiMethod.PUT,
      url: ApiCalls.TASK_DELETE,
      payload,
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
