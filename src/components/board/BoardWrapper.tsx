import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';

import { joinBoard } from '@common/api/socket/socketEvents/boardEvents';
import { getBoardById } from '@common/helpers/boardHelper';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { setDndData } from '@common/providers/dndProvider/useDndState';
import { useUserState } from '@common/providers/userProvider/useUserState';

import EmptyLayout from '@components/layouts/emptyLayout/EmptyLayout';
import { IEmptyLayoutType } from '@components/layouts/emptyLayout/EmptyLayout.types';
import Loader from '@components/layouts/loader/Loader';

import BoardComponent from './boardComponent/BoardComponent';
import useDndHandlers from './hooks/useDndHandlers';

const BoardWrapper = (): JSX.Element => {
  const boardId = useBoardState((state) => state.currentBoardId);
  const boardLoading = useBoardState((s) => s.loading);
  const userLoading = useUserState((s) => s.loading);
  const { dndContext } = useDndHandlers();

  const isEmptyBoards = useBoardState((s) => isEmpty(s.boardList));
  const isEmptyColumns = useBoardState((s) =>
    isEmpty(s.boardList?.[s.currentBoardId || '']?.columns)
  );

  useEffect(() => {
    if (boardId && !boardLoading) {
      const board = getBoardById(boardId);
      if (board) {
        setDndData(board);
      }
    }
  }, [boardId, boardLoading]);

  useEffect(() => {
    if (boardId) {
      joinBoard(boardId);
    }
  }, [boardId]);

  if (isEmptyBoards && !boardLoading) {
    return <EmptyLayout type={IEmptyLayoutType.BOARD} />;
  }

  if (isEmptyColumns && !boardLoading) {
    return <EmptyLayout type={IEmptyLayoutType.COLUMN} />;
  }
  const loading = userLoading || boardLoading;

  if (loading) {
    return <Loader isOpaque isRelative />;
  }

  return <BoardComponent dndContext={dndContext} />;
};

export default BoardWrapper;
