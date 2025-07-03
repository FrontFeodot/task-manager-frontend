import { upperCase } from 'lodash';
import { useTheme } from 'styled-components';

import {
  isBoardOwner,
  setCurrentBoardAction,
} from '@common/helpers/boardHelper';
import Icon from '@common/icons/Icon';
import { IBoard } from '@common/providers/boardProvider/types';
import { openEditor } from '@common/providers/boardProvider/useBoardState';

import { TextInline } from '@components/text/TextCommon.styled';

import * as S from './BoardNavList.styled';

const BoardNavItem: React.FC<{
  board: IBoard;
  isExpanded: boolean;
  currentBoardId: string | null;
}> = ({ board, isExpanded, currentBoardId }) => {
  const { iconColor } = useTheme();

  const { title, boardId, ownerEmail } = board;
  const isOwner = isBoardOwner(ownerEmail);
  const isSelected = currentBoardId === boardId;

  const displayedTitle = isExpanded ? title : upperCase(Array.from(title)[0]);
  return (
    <S.BoardListItem
      $isExpanded={isExpanded}
      $isSelected={isSelected}
      key={`index-${boardId}`}
      onClick={
        !isSelected
          ? (): Promise<void> => setCurrentBoardAction(boardId, true)
          : undefined
      }
    >
      <S.ListItemLabel $isExpanded={isExpanded}>
        <TextInline>{`${displayedTitle}${!isOwner ? ` (${ownerEmail})` : ''}`}</TextInline>
      </S.ListItemLabel>
      <S.BoardSettingWrapper onClick={() => openEditor({ data: board })}>
        <Icon name="settings" color={iconColor} size={16} />
      </S.BoardSettingWrapper>
    </S.BoardListItem>
  );
};

export default BoardNavItem;
