import { getBoard } from '@common/api/getBoard';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { SELECTED_BOARD } from '@common/utils/cookies';
import Board from '@components/board/Board';
import Cookies from 'js-cookie';
import { map } from 'lodash';
import React, { useEffect } from 'react';

const BoardPage = (): JSX.Element => {
  const boardList = useBoardState((s) => s.boardList);
  const selectedBoardName = Cookies.get(SELECTED_BOARD);

  console.log('boardList', boardList);
  useEffect(() => {
    getBoard();
  }, []);

  if (!boardList || !selectedBoardName) {
    return <>Empty</>;
  }

  return (
    <div className="board">
      <Board boardData={boardList[selectedBoardName]} />
    </div>
  );
};

export default BoardPage;
