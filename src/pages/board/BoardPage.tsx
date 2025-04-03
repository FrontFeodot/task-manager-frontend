import { useEffect } from 'react';

import Board from '@components/board/Board';
import BoardNav from '@components/boardNav/BoardNav';

import { getBoards } from '@common/api/boardApi';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import * as S from './BoardPage.styled';
import { useUserState } from '@common/providers/userProvider/useUserState';
import Loader from '@components/layouts/loader/Loader';

const BoardPage = (): JSX.Element => {
  const boardList = useBoardState((s) => s.boardList);
  const boardLoading = useBoardState((s) => s.loading);
  const userLoading = useUserState((s) => s.loading);
  const selectedBoardName = useBoardState((s) => s.currentBoardTitle) || '';

  const loading = userLoading || boardLoading;

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <S.Wrapper>
      <BoardNav boardList={boardList} />

      <Board boardData={boardList?.[selectedBoardName]} loading={loading} />
    </S.Wrapper>
  );
};

export default BoardPage;
