import { createTaskApi } from '@common/api/taskApi';
import { ITask } from '@common/interfaces/ITask';
import { getLastOrderByType } from './taskHelper';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { getColumn } from './columnHelper';
import { getCurrentBoardId } from './boardHelper';
import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';
import { omit } from 'lodash';

export const createTaskHandler = async (
  data: ITaskFormValues
): Promise<ICustomResponse> => {
  const columnId = getColumn({ columnTitle: data.column })?.columnId;
  const boardId = getCurrentBoardId();
  const order = getLastOrderByType('tasks', columnId as string);
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
    return response;
  } catch (err) {
    console.error('createTaskHandler', err);
    return err as ICustomResponse;
  }
};
