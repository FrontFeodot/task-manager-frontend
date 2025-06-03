import toUpper from 'lodash/toUpper';
import { DragOverlay } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import TasksSection from '@components/board/tasksSection/TasksSection';
import TaskCard from '@components/board/tasksSection/tasks/TaskCard';
import CreateTask from '@components/board/tasksSection/tasks/CreateTaskCard';

import * as S from './Column.styled';
import { IColumnProps } from './Column.types';
import { openEditor } from '@common/providers/boardProvider/useBoardState';
import { getCurrentBoardData } from '@common/helpers/boardHelper';
import { IBoard } from '@common/providers/boardProvider/types';
import { useTheme } from 'styled-components';

const Column = ({
  column,
  taskSection,
  activeId,
  activeTask,
  isDone,
}: IColumnProps): JSX.Element => {
  const { iconColor } = useTheme();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column?.columnId || 'New column',
    data: {
      type: 'columns',
      column,
      sortable: { containerId: column?.columnId },
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),

    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const onCreateColumn = () => {
    openEditor({ newField: 'column', data: getCurrentBoardData() as IBoard });
  };

  return (
    <S.ColumnWrapper
      style={style}
      ref={taskSection && setNodeRef}
      id={column?.columnId}
      className="column"
      $isDone={!!isDone}
    >
      {!!taskSection && column !== undefined ? (
        <>
          <S.DnDAnchor
            name="drag"
            color={iconColor}
            {...attributes}
            {...listeners}
          />
          <S.ColumnLabel $hasItems={!!taskSection.length}>
            <S.ColumnText>{toUpper(column.title)}</S.ColumnText>
          </S.ColumnLabel>

          <TasksSection taskSection={taskSection} columnId={column.columnId} />
          {activeId && activeTask ? (
            <DragOverlay>
              <TaskCard {...activeTask} />
            </DragOverlay>
          ) : null}
          <CreateTask columnName={column.title} />
        </>
      ) : (
        <S.ColumnText onClick={onCreateColumn} $isCreateColumn>
          Create new column
        </S.ColumnText>
      )}
    </S.ColumnWrapper>
  );
};

export default Column;
