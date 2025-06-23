import { getBoards } from '@common/api/boardApi';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import {
  IManageColumn,
  IManageMembers,
} from '@common/interfaces/ISocketEvents';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  setBoardData,
  setBoardEditorResult,
} from '@common/providers/boardProvider/useBoardState';

import { getSocket } from '../socket';

export const joinBoard = (boardId: string) => {
  const socket = getSocket();
  socket.emit('joinBoard', boardId, (ack: ICustomResponse) => {
    console.log('joinBoard ack => ', ack);
  });
};

export const updateBoardDataEvent = (boardData: Partial<IBoard>): void => {
  const socket = getSocket();
  socket.emit('updateBoardData', boardData, (ack: ICustomResponse) => {
    setBoardEditorResult(ack);
    if (ack.payload) {
      setBoardData(ack.payload);
    }
  });
};

export const manageColumnEvent = (columnData: IManageColumn) => {
  const socket = getSocket();
  socket.emit('manageColumn', columnData, (ack: ICustomResponse) => {
    setBoardEditorResult(ack);
    if (ack.payload) {
      setBoardData(ack.payload);
    }
  });
};

export const manageMembersEvent = (membersData: IManageMembers) => {
  const socket = getSocket();
  socket.emit('manageMembers', membersData, (ack: ICustomResponse) => {
    setBoardEditorResult(ack);
    if (membersData.type === 'leave') {
      return getBoards();
    }
    if (ack.payload) {
      setBoardData(ack.payload);
    }
  });
};
