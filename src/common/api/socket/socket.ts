import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client';

import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  setBoardData,
  setBoardEditorResult,
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
  socket.emit('updateBoardData', boardData, (ack: ICustomResponse) => {
    console.log('updateBoardData ack => ', ack);
    setBoardEditorResult(ack);
  });
};

export interface IManageColumn {
  boardId: string;
  title?: string;
  order?: number;
  columnId?: string;
  isDelete?: boolean;
}

export const manageColumnEvent = (columnData: IManageColumn) => {
  socket.emit('manageColumn', columnData, (ack: ICustomResponse) => {
    console.log('manageColumn ack => ', ack);
    setBoardEditorResult(ack);
  });
};

export interface IManageMembers {
  type: 'share' | 'leave' | 'kick';
  boardId: string;
  memberEmail: string;
}

export const manageMembersEvent = (membersData: IManageMembers) => {
  socket.emit('manageMembers', membersData, (ack: ICustomResponse) => {
    console.log('manageMembers ack => ', ack);
    setBoardEditorResult(ack);
    if (membersData.type === 'leave') {
      getBoards();
    }
  });
};

export const boardListeners = () => {
  socket.on('boardDataUpdated', (boardData: Partial<IBoard>) => {
    console.log('boardDataUpdated => ', boardData);
    setBoardData(boardData);
  });
};
