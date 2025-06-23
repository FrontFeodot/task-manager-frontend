import { IBoard } from '@common/providers/boardProvider/types';
import { setBoardData } from '@common/providers/boardProvider/useBoardState';

import { getSocket } from '../socket';

const boardListeners = () => {
  const socket = getSocket();
  socket.on('boardDataUpdated', (boardData: Partial<IBoard>) => {
    setBoardData(boardData);
  });
};

export default boardListeners;
