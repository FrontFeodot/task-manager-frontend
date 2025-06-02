import map from 'lodash/map';
import { useTheme } from 'styled-components';

import { TextInline } from '@components/text/TextCommon.styled';

import { emptyBoard } from '@common/utils/boardEditorConfig';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  getCurrentBoardId,
  setCurrentBoardAction,
} from '@common/helpers/boardHelper';
import { openEditor } from '@common/providers/boardProvider/useBoardState';
import Icon from '@common/icons/Icon';

import * as S from './BoardNavList.styled';
import { IBoardNavList } from './BoardNavList.types';
import { keys, upperCase } from 'lodash';

const BoardNavList = ({
  boardList,
  isExpanded,
}: IBoardNavList): JSX.Element => {
  const { iconColor } = useTheme();
  const currentBoardId = getCurrentBoardId();
  return (
    <S.BoardList>
      {boardList
        ? map(keys(boardList), (boardTitle, index) => {
            const currentBoard = boardList[boardTitle];
            const title = isExpanded
              ? boardTitle
              : upperCase(Array.from(boardTitle)[0]);
            return (
              <S.BoardListItem
                $isExpanded={isExpanded}
                $isSelected={currentBoardId === currentBoard.boardId}
                key={index}
                onClick={(): void => setCurrentBoardAction(currentBoard.title)}
              >
                <S.ListItemLabel $isExpanded={isExpanded}>
                  <TextInline>{title}</TextInline>
                </S.ListItemLabel>
                <S.BoardSettingWrapper
                  onClick={() => openEditor({ data: currentBoard })}
                >
                  <Icon name="settings" color={iconColor} size={16} />
                </S.BoardSettingWrapper>
              </S.BoardListItem>
            );
          })
        : null}
      <S.BoardListItem
        $isExpanded={isExpanded}
        $isCreateLabel
        onClick={(): void =>
          openEditor({ newField: 'board', data: emptyBoard as IBoard })
        }
      >
        <S.ListItemLabel $isExpanded>
          <Icon name="plus" size={16} />
        </S.ListItemLabel>
      </S.BoardListItem>
    </S.BoardList>
  );
};

export default BoardNavList;
