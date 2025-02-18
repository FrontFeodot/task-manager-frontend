import { ApiCalls, IApiMethod } from '@common/interfaces/IApiHandler';
import apiHandler from './apiHandler';
import CustomError from './error';
import {
  ITask,
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from '@common/interfaces/ITask';

const createTask =
  async (/* task: Partial<ITask> */): Promise<CustomError | void> => {
    try {
      const response = apiHandler({
        method: IApiMethod.POST,
        url: ApiCalls.TASK_CREATE,
        payload: {
          name: 'Test Test',
          userId: 'AP5RMYk6hK3vtkmvrZeUs',
          priority: ITaskPriority.LOW,
          status: ITaskStatus.DONE,
          description: 'description test',
          customFields: {
            'test custom field': 1,
          },
          type: ITaskType.TASK,
          /* parentTask, */
          column: 'year',
          board: '67ac7f0bc9f1da7a83305d6b',
        },
        withAuth: true,
      });

      console.log(response);
    } catch (err) {}
  };

export default createTask;
