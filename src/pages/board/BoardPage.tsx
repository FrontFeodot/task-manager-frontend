import { useEffect } from 'react';

import BoardWrapper from '@components/board/BoardWrapper';
import BoardNav from '@components/boardNav/BoardNav';

import { getBoards } from '@common/api/boardApi';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { useUserState } from '@common/providers/userProvider/useUserState';

import * as S from './BoardPage.styled';

const BoardPage = (): JSX.Element => {
  const boardList = useBoardState((s) => s.boardList);
  const boardLoading = useBoardState((s) => s.loading);
  const selectedBoardName = useBoardState((s) => s.currentBoardTitle) || '';

  const userLoading = useUserState((s) => s.loading);

  const loading = userLoading || boardLoading;

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <S.Wrapper>
      <BoardNav boardList={boardList} />

      <BoardWrapper
        boardData={boardList?.[selectedBoardName]}
        loading={loading}
      />
    </S.Wrapper>
  );
};

export default BoardPage;
