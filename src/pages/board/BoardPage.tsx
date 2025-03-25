import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import Board from '@components/board/Board';

import { getBoards } from '@common/api/boardApi';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { SELECTED_BOARD } from '@common/utils/cookies';
import { isEmpty, keys } from 'lodash';

import * as S from './BoardPage.styled';
import BoardNav from '@components/boardNav/BoardNav';

const BoardPage = (): JSX.Element => {
  const boardList = useBoardState((s) => s.boardList);
  const selectedBoardName = useBoardState((s) => s.currentBoardTitle);

  useEffect(() => {
    getBoards();
  }, []);

  if (isEmpty(boardList) || !selectedBoardName) {
    return <>Empty</>;
  }

  return (
    <S.Wrapper>
      <BoardNav boardList={boardList} />
      {isEmpty(boardList) || !selectedBoardName ? (
        'Empty'
      ) : (
        <Board boardData={boardList[selectedBoardName]} />
      )}
    </S.Wrapper>
  );
};

export default BoardPage;
