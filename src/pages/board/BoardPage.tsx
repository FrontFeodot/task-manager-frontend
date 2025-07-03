import { useEffect } from 'react';

import { getBoards } from '@common/api/boardApi';
import { connectSocket, disconnectSocket } from '@common/api/socket/socket';
import { resetBoardList } from '@common/providers/boardProvider/useBoardState';

import BoardWrapper from '@components/board/BoardWrapper';
import BoardNav from '@components/boardNav/BoardNav';

import * as S from './BoardPage.styled';

const BoardPage = (): JSX.Element => {
  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    getBoards();
    return () => {
      resetBoardList();
    };
  }, []);

  return (
    <S.Wrapper>
      <BoardNav />

      <BoardWrapper />
    </S.Wrapper>
  );
};

export default BoardPage;
