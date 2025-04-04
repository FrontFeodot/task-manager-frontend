import { useEffect, useState } from 'react';
import {
  RiExpandRightFill,
  RiExpandLeftFill,
  RiCloseLargeLine,
} from 'react-icons/ri';
import find from 'lodash/find';
import { useTheme } from 'styled-components';

import { IBoard } from '@common/providers/boardProvider/types';
import {
  closeEditor,
  useBoardState,
} from '@common/providers/boardProvider/useBoardState';
import { isDesktopView } from '@common/helpers/appHelper';

import * as S from './BoardNav.styled';
import { IBoardNav } from './BoardNav.types';
import BoardNavList from './boardNavList/BoardNavList';
import BoardEditor from './boardEditor/BoardEditor';

const BoardNav = ({ boardList }: IBoardNav): JSX.Element => {
  const isDesktop = isDesktopView();
  const [isExpanded, toggleNav] = useState(isDesktop);
  const { iconColor } = useTheme();
  const [newBoardTitle, setNewBoardTitle] = useState<string | null>(null);
  const ToggleIcon = isExpanded ? RiExpandLeftFill : RiExpandRightFill;
  const openedEditor = useBoardState((s) => s.openedEditor);
  const boardNavText = openedEditor ? 'Settings' : 'Boards List';

  const editorData =
    find(
      boardList,
      (board) =>
        board.title === newBoardTitle ||
        board.boardId === openedEditor?.data.boardId
    ) || openedEditor?.data;

  useEffect(() => {
    if (openedEditor) {
      toggleNav(true);
    }
  }, [openedEditor]);

  const onToggleClick = (): void => {
    toggleNav(!isExpanded);
    if (openedEditor) {
      closeEditor();
    }
  };

  return (
    <S.BoardNavWrapper $isExpanded={isExpanded}>
      <S.TopSection $isExpanded={isExpanded}>
        <S.CloseEditorWrapper
          $isExpanded={isExpanded}
          $isOpenedEditor={!!openedEditor}
          onClick={closeEditor}
        >
          {openedEditor ? (
            <RiCloseLargeLine size={18} fill={iconColor} />
          ) : null}
        </S.CloseEditorWrapper>
        <S.ToggleNavViewWrapper
          $isExpanded={isExpanded}
          onClick={onToggleClick}
        >
          <ToggleIcon fill={iconColor} size={18} />
        </S.ToggleNavViewWrapper>
      </S.TopSection>
      <S.BoardNavLabel>{isExpanded ? boardNavText : null}</S.BoardNavLabel>
      {openedEditor ? (
        <BoardEditor
          editorData={editorData as IBoard}
          newField={openedEditor.newField}
          setUpdatedData={setNewBoardTitle}
        />
      ) : (
        <BoardNavList boardList={boardList} isExpanded={isExpanded} />
      )}
    </S.BoardNavWrapper>
  );
};

export default BoardNav;
