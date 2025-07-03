import ColumnList from '../columnList/ColumnList';
import DragOverlays from '../dragOverlays/DragOverlays';
import * as S from './BoardComponent.styled';
import { IBoardComponent } from './BoardComponent.types';
import { DndContext } from '@dnd-kit/core';

const BoardComponent = ({ dndContext }: IBoardComponent): JSX.Element => {
  return (
    <S.BoardWrapper>
      <DndContext {...dndContext}>
        <ColumnList />
        <DragOverlays />
      </DndContext>
    </S.BoardWrapper>
  );
};

export default BoardComponent;
