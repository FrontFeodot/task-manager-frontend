import { useState } from 'react';
import map from 'lodash/map';
import { RiExpandRightFill, RiExpandLeftFill } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';

import { MdOutlineSettings } from 'react-icons/md';

import * as S from './BoardNavList.styled';
import { IBoardNavList } from './BoardNavList.types';
import { keys } from 'lodash';
import { emptyBoard } from '@common/utils/boardEditorConfig';
import { IBoard } from '@common/providers/boardProvider/types';
import { setCurrentBoardAction } from '@common/helpers/boardHelper';
import { openEditor } from '@common/providers/boardProvider/useBoardState';

const BoardNavList = ({ boardList }: IBoardNavList): JSX.Element => {
  return (
    <S.BoardList>
      {boardList
        ? map(keys(boardList), (boardTitle, index) => {
            const currentBoard = boardList[boardTitle];
            return (
              <S.BoardListItem
                key={index}
                onClick={(): void => setCurrentBoardAction(currentBoard.title)}
              >
                <S.ListItemLabel>{boardTitle}</S.ListItemLabel>
                <S.BoardSettingWrapper onClick={() => openEditor(currentBoard)}>
                  <MdOutlineSettings fill="#F5F6F7" size={16} />
                </S.BoardSettingWrapper>
              </S.BoardListItem>
            );
          })
        : null}
      <S.BoardListItem
        $isCreateLabel
        onClick={(): void => openEditor(emptyBoard as IBoard)}
      >
        <S.ListItemLabel>
          <GoPlus size={16} />
        </S.ListItemLabel>
      </S.BoardListItem>
    </S.BoardList>
  );
};

export default BoardNavList;
