import toUpper from 'lodash/toUpper';
import { DragOverlay } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import TasksSection from '@components/board/tasksSection/TasksSection';
import TaskCard from '@components/board/tasksSection/tasks/TaskCard';
import CreateTask from '@components/board/tasksSection/tasks/CreateTaskCard';

import * as S from './Column.styled';
import { IColumnProps } from './Column.types';

const Column = ({
  column,
  taskSection,
  activeId,
  activeTask,
}: IColumnProps): JSX.Element => {
  const { columnId, title } = column;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columnId,
    data: {
      type: 'columns',
      column,
      sortable: { containerId: columnId },
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),

    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <S.ColumnWrapper
      style={style}
      ref={setNodeRef}
      id={columnId}
      key={columnId}
      className="column"
    >
      <S.DnDAnchor fill="#F5F6F7" {...attributes} {...listeners} />
      <S.ColumnLabel hasItems={!!taskSection.length}>
        <S.ColumnText>{toUpper(title)}</S.ColumnText>
      </S.ColumnLabel>

      <TasksSection taskSection={taskSection} columnId={columnId} />
      {activeId && activeTask ? (
        <DragOverlay>
          <TaskCard {...activeTask} />
        </DragOverlay>
      ) : null}
      <CreateTask columnName={title} />
    </S.ColumnWrapper>
  );
};

export default Column;
