
import { IBoard } from '@common/providers/boardProvider/types';
import { setBoardData } from '@common/providers/boardProvider/useBoardState';
import { updateDndColumns } from '@common/providers/dndProvider/useDndState';

import { getSocket } from '../socket';

const boardListeners = () => {
  const socket = getSocket();
  socket.on('boardDataUpdated', (boardData: Partial<IBoard>) => {
    setBoardData(boardData);
    if (boardData.columns) {
      updateDndColumns(boardData.columns);
    }
  });
};

export default boardListeners;
