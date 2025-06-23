import { omit } from 'lodash';

import { createTaskApi } from '@common/api/taskApi';
import { ICustomResponse } from '@common/interfaces/IApiHandler';

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
    return response;
  } catch (err) {
    return err as ICustomResponse;
  }
};
