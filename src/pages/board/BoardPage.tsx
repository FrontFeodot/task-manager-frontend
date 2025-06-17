import { useEffect } from 'react';

import { getBoards } from '@common/api/boardApi';
import {
  connectSocket,
  disconnectSocket,
  joinBoard,
} from '@common/api/socket/socket';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { useUserState } from '@common/providers/userProvider/useUserState';

import BoardWrapper from '@components/board/BoardWrapper';
import BoardNav from '@components/boardNav/BoardNav';

import * as S from './BoardPage.styled';

const BoardPage = (): JSX.Element => {
  const boardList = useBoardState((s) => s.boardList);
  const boardLoading = useBoardState((s) => s.loading);
  const selectedBoardId = useBoardState((s) => s.currentBoardId) || '';
  const userLoading = useUserState((s) => s.loading);
  const selectedBoardData = useBoardState(
    (s) => s.boardList?.[selectedBoardId]
  );
  const loading = userLoading || boardLoading;

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (selectedBoardId) {
      joinBoard(selectedBoardId);
    }
  }, [selectedBoardId]);
  useEffect(() => {
    getBoards();
  }, []);

  return (
    <S.Wrapper>
      <BoardNav boardList={boardList} />

      <BoardWrapper boardData={selectedBoardData} loading={loading} />
    </S.Wrapper>
  );
};

export default BoardPage;
