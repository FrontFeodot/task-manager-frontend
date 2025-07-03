import { ICustomResponse } from '@common/interfaces/IApiHandler';
import {
  setEventResult,
  setMultiplyTasks,
} from '@common/providers/boardProvider/useBoardState';
import { ITasksSchema } from '@common/providers/dndProvider/types';

import { getSocket } from '../socket';

export const updateMultiplyTasksEvent = (
  boardId: string,
  tasksToUpdate: ITasksSchema[]
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
