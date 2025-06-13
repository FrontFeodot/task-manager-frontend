import { useEffect, useState } from 'react';
import find from 'lodash/find';

import { IBoard } from '@common/providers/boardProvider/types';
import {
  closeEditor,
  useBoardState,
} from '@common/providers/boardProvider/useBoardState';
import { isDesktopView } from '@common/helpers/appHelper';
import Icon from '@common/icons/Icon';

import * as S from './BoardNav.styled';
import { IBoardNav } from './BoardNav.types';
import BoardNavList from './boardNavList/BoardNavList';
import BoardEditor from './boardEditor/BoardEditor';

const BoardNav = ({ boardList }: IBoardNav): JSX.Element => {
  const isDesktop = isDesktopView();
  const [isExpanded, toggleNav] = useState(isDesktop);
  const openedEditor = useBoardState((s) => s.openedEditor);
  const boardNavText = openedEditor ? 'Settings' : 'Boards List';
  const editorData =
    find(boardList, (board) => board.boardId === openedEditor?.data.boardId) ||
    openedEditor?.data;

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
          {openedEditor ? <Icon name="cross" size={18} /> : null}
        </S.CloseEditorWrapper>
        <S.ToggleNavViewWrapper
          $isExpanded={isExpanded}
          onClick={onToggleClick}
        >
          <Icon name={isExpanded ? 'expand-left' : 'expand-right'} />
        </S.ToggleNavViewWrapper>
      </S.TopSection>
      <S.BoardNavLabel>{isExpanded ? boardNavText : null}</S.BoardNavLabel>
      {openedEditor ? (
        <BoardEditor
          editorData={editorData as IBoard}
          newField={openedEditor.newField}
          result={openedEditor.result}
        />
      ) : (
        <BoardNavList boardList={boardList} isExpanded={isExpanded} />
      )}
    </S.BoardNavWrapper>
  );
};

export default BoardNav;
