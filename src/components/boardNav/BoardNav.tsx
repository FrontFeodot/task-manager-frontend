import { useEffect, useState } from 'react';
import { RiExpandRightFill, RiExpandLeftFill } from 'react-icons/ri';

import * as S from './BoardNav.styled';
import { IBoardNav } from './BoardNav.types';
import { IBoard } from '@common/providers/boardProvider/types';
import BoardNavList from './boardNavList/BoardNavList';
import BoardEditor from './boardEditor/BoardEditor';
import { differenceBy, find, keys } from 'lodash';
import {
  openEditor,
  useBoardState,
} from '@common/providers/boardProvider/useBoardState';

const BoardNav = ({ boardList }: IBoardNav): JSX.Element => {
  const [isExpanded, toggleNav] = useState(true);

  const [updatedData, setUpdatedData] = useState<string | null>(null);
  const ToggleIcon = isExpanded ? RiExpandLeftFill : RiExpandRightFill;
  const openedEditor = useBoardState((s) => s.openedEditor);

  useEffect(() => {
    const selectedBoard = find(
      boardList,
      (board) =>
        board.title === updatedData || board.boardId === openedEditor?.boardId
    );

    if (selectedBoard) {
      openEditor(selectedBoard as IBoard);
    }

    if (updatedData) {
      setUpdatedData(null);
    }
  }, [updatedData, keys(boardList)]);

  return (
    <S.BoardNavWrapper $isExpanded={isExpanded}>
      <S.ToggleNavViewWrapper onClick={() => toggleNav(!isExpanded)}>
        <ToggleIcon fill="#F5F6F7" size={18} />
      </S.ToggleNavViewWrapper>
      <S.BoardNavLabel>
        {openedEditor ? 'Settings' : 'Boards List'}
      </S.BoardNavLabel>
      {openedEditor ? (
        <BoardEditor board={openedEditor} setUpdatedData={setUpdatedData} />
      ) : (
        <BoardNavList boardList={boardList} />
      )}
    </S.BoardNavWrapper>
  );
};

export default BoardNav;
