import { omit } from 'lodash';

import { getBoards } from '@common/api/boardApi';
import { createTaskApi, deleteTask } from '@common/api/taskApi';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { ITask } from '@common/interfaces/ITask';

import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';

import { getCurrentBoardId } from './boardHelper';
import { getColumn } from './columnHelper';
import { getLastOrderByType } from './taskHelper';

export const createTaskHandler = async (
  data: ITaskFormValues
): Promise<ICustomResponse> => {
  const columnId = getColumn({ columnTitle: data.column })?.columnId;
  const boardId = getCurrentBoardId() as string;
  const order = getLastOrderByType({ type: 'tasks', columnId, boardId });
  try {
    const response = await createTaskApi({
      ...omit(data, 'column'),
      columnId,
      boardId,
      order,
    });
    if (response instanceof Error || response.isError) {
      throw response;
    }
    await getBoards();

    return response;
  } catch (err) {
    return err as ICustomResponse;
  }
};

export const deleteTaskHandler = async (
  data: Pick<ITask, 'taskId' | 'boardId'>
): Promise<ICustomResponse> => {
  try {
    const response = await deleteTask(data);
    if (response.isError) {
      throw response;
    }
    if (response.isSuccess) {
      await getBoards();
    }
    return response as ICustomResponse;
  } catch (err) {
    return err as ICustomResponse;
  }
};
