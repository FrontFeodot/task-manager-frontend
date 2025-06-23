import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client';

import { ICustomResponse } from '@common/interfaces/IApiHandler';
import {
  IManageColumn,
  IManageMembers,
  ITasksUpdated,
} from '@common/interfaces/ISocketEvents';
import { ITask } from '@common/interfaces/ITask';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  removeDeletedTask,
  setBoardData,
  setBoardEditorResult,
  setEventResult,
  setMultiplyTasks,
  setUpdatedTask,
} from '@common/providers/boardProvider/useBoardState';
import { AUTH_TOKEN } from '@common/utils/cookies';

import { getBoards } from '../boardApi';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const socket: Socket = io(BASE_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

export const connectSocket = () => {
  const token = Cookies.get(AUTH_TOKEN);
  socket.auth = { token };
  socket.connect();
  boardListeners();
  tasksListeners();
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const joinBoard = (boardId: string) => {
  socket.emit('joinBoard', boardId, (ack: ICustomResponse) => {
    console.log('joinBoard ack => ', ack);
  });
};

export const updateBoardData = (boardData: Partial<IBoard>): void => {
  console.log('boardData', boardData);
  socket.emit('updateBoardData', boardData, (ack: ICustomResponse) => {
    console.log('updateBoardData ack => ', ack);
    setBoardEditorResult(ack);
  });
};

export const manageColumnEvent = (columnData: IManageColumn) => {
  socket.emit('manageColumn', columnData, (ack: ICustomResponse) => {
    console.log('manageColumn ack => ', ack);
    setBoardEditorResult(ack);
  });
};

export const manageMembersEvent = (membersData: IManageMembers) => {
  socket.emit('manageMembers', membersData, (ack: ICustomResponse) => {
    console.log('manageMembers ack => ', ack);
    setBoardEditorResult(ack);
    if (membersData.type === 'leave') {
      getBoards();
    }
  });
};

export const updateMultiplyTasksEvent = (
  boardId: string,
  tasksToUpdate: Partial<ITask>[]
) => {
  socket.emit(
    'updateMultiplyTasks',
    boardId,
    tasksToUpdate,
    (ack: ICustomResponse) => {
      console.log('manageMembers ack => ', ack);
      setEventResult(ack);
    }
  );
};
export const boardListeners = () => {
  socket.on('boardDataUpdated', (boardData: Partial<IBoard>) => {
    console.log('boardDataUpdated => ', boardData);
    setBoardData(boardData);
  });
};

export const tasksListeners = () => {
  socket.on(
    'multiplyTasksUpdated',
    (taskUpdatedData: ICustomResponse<ITasksUpdated>) => {
      console.log('tasksUpdated => ', taskUpdatedData);
      if (taskUpdatedData.payload) {
        setMultiplyTasks(taskUpdatedData.payload);
      }
    }
  );

  socket.on('taskUpdated', (taskUpdatedData: ICustomResponse<ITask>) => {
    console.log('tasksUpdated => ', taskUpdatedData);
    if (taskUpdatedData.payload) {
      setUpdatedTask(taskUpdatedData.payload);
    }
  });

  socket.on(
    'taskDeleted',
    (taskDeletedData: ICustomResponse<{ taskId: number; boardId: string }>) => {
      console.log('taskDeleted => ', taskDeletedData);
      if (!taskDeletedData.payload) {
        return console.error('Payload missing in delete task event');
      }
      const { taskId, boardId } = taskDeletedData.payload;
      if (!taskId || !boardId) {
        return console.error('Wrong data from delete task event');
      }
      removeDeletedTask(taskId, boardId);
    }
  );
};
