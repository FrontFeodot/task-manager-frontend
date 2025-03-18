import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import Board from '@components/board/Board';

import { getBoard } from '@common/api/getBoard';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { SELECTED_BOARD } from '@common/utils/cookies';
import { isEmpty } from 'lodash';

const BoardPage = (): JSX.Element => {
  const boardList = useBoardState((s) => s.boardList);
  const selectedBoardName = Cookies.get(SELECTED_BOARD);

  useEffect(() => {
    getBoard();
  }, []);

  if (isEmpty(boardList) || !selectedBoardName) {
    return <>Empty</>;
  }

  return <Board boardData={boardList[selectedBoardName]} />;
};

export default BoardPage;
