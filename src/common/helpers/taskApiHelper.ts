import { createTaskApi, deleteTask } from '@common/api/taskApi';
import { ITask } from '@common/interfaces/ITask';
import { getLastOrderByType } from './taskHelper';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { getColumn } from './columnHelper';
import { getCurrentBoardId } from './boardHelper';
import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import { omit } from 'lodash';
import { getBoards } from '@common/api/boardApi';

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
