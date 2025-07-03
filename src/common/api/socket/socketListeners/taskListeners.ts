import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { ITasksUpdated } from '@common/interfaces/ISocketEvents';
import { ITask } from '@common/interfaces/ITask';
import {
  removeDeletedTask,
  setMultiplyTasks,
  setUpdatedTask,
} from '@common/providers/boardProvider/useBoardState';
import { updateDndTasks } from '@common/providers/dndProvider/useDndState';

import { getSocket } from '../socket';

const tasksListeners = () => {
  const socket = getSocket();
  socket.on(
    'multiplyTasksUpdated',
    (taskUpdatedData: ICustomResponse<ITasksUpdated>) => {
      if (taskUpdatedData.payload) {
        setMultiplyTasks(taskUpdatedData.payload);
        updateDndTasks({
          tasks: taskUpdatedData.payload.updatedTasks,
        });
      }
    }
  );

  socket.on('taskUpdated', (taskUpdatedData: ICustomResponse<ITask>) => {
    if (taskUpdatedData.payload) {
      setUpdatedTask(taskUpdatedData.payload);
      updateDndTasks({
        tasks: [taskUpdatedData.payload],
      });
    }
  });

  socket.on(
    'taskDeleted',
    (taskDeletedData: ICustomResponse<{ taskId: number; boardId: string }>) => {
      if (!taskDeletedData.payload) {
        return console.error('Payload missing in delete task event');
      }
      const { taskId, boardId } = taskDeletedData.payload;
      if (!taskId || !boardId) {
        return console.error('Wrong data from delete task event');
      }
      removeDeletedTask(taskId, boardId);
      updateDndTasks({
        tasks: [taskDeletedData.payload],
        isDelete: true,
      });
    }
  );
};

export default tasksListeners;
