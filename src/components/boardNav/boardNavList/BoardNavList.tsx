import { keys } from 'lodash';
import map from 'lodash/map';

import Icon from '@common/icons/Icon';
import { IBoard } from '@common/providers/boardProvider/types';
import {
  openEditor,
  useBoardState,
} from '@common/providers/boardProvider/useBoardState';
import { emptyBoard } from '@common/utils/boardEditorConfig';

import BoardNavItem from './BoardNavItem';
import * as S from './BoardNavList.styled';
import { IBoardNavList } from './BoardNavList.types';

const BoardNavList = ({ isExpanded }: IBoardNavList): JSX.Element => {
  const currentBoardId = useBoardState((state) => state.currentBoardId);
  const boardList = useBoardState((s) => s.boardList);

  return (
    <S.BoardList>
      {boardList
        ? map(keys(boardList), (boardId, index) => (
            <BoardNavItem
              board={boardList[boardId]}
              isExpanded={isExpanded}
              currentBoardId={currentBoardId}
              key={index}
            />
          ))
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
