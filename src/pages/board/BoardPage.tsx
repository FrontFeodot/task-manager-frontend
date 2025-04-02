import { useEffect } from 'react';

import Board from '@components/board/Board';
import BoardNav from '@components/boardNav/BoardNav';

import { getBoards } from '@common/api/boardApi';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import * as S from './BoardPage.styled';

const BoardPage = (): JSX.Element => {
  const boardList = useBoardState((s) => s.boardList);
  const selectedBoardName = useBoardState((s) => s.currentBoardTitle) || '';

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <S.Wrapper>
      <BoardNav boardList={boardList} />

      <Board boardData={boardList?.[selectedBoardName]} />
    </S.Wrapper>
  );
};

export default BoardPage;
