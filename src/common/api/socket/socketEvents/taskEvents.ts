import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { ITask } from '@common/interfaces/ITask';
import {
  setEventResult,
  setMultiplyTasks,
} from '@common/providers/boardProvider/useBoardState';

import { getSocket } from '../socket';

export const updateMultiplyTasksEvent = (
  boardId: string,
  tasksToUpdate: Partial<ITask>[]
) => {
  const socket = getSocket();
  socket.emit(
    'updateMultiplyTasks',
    boardId,
    tasksToUpdate,
    (ack: ICustomResponse) => {
      setEventResult(ack);
      if (ack.payload) {
        setMultiplyTasks(ack.payload);
      }
    }
  );
};
