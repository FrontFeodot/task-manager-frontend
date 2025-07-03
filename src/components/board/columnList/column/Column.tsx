import toUpper from 'lodash/toUpper';
import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';

import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import CreateTask from '@components/board/tasksSection/tasks/CreateTaskCard';
import TasksSection from '@components/board/tasksSection/TasksSection';

import * as S from './Column.styled';
import { IColumnProps } from './Column.types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Column = ({ columnId }: IColumnProps): JSX.Element => {
  const { iconColor } = useTheme();
  const currentBoard = useBoardState((state) => state.currentBoardId);
  const currentColumn = useBoardState(
    (state) => state.boardList?.[currentBoard!]?.columns?.[columnId]
  );
  const doneColumn = useBoardState(
    (state) => state.boardList?.[currentBoard!]?.doneColumn
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columnId || 'New column',
    data: {
      type: 'columns',
      sortable: { containerId: columnId },
    },
  });

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }),
    [transform, transition, isDragging]
  );

  /*   const onCreateColumn = () =>
    useCallback(() => {
      openEditor({ newField: 'column', data: getCurrentBoardData() as IBoard });
    }, []);
 */

  const MemoizedTaskSection = useMemo(
    () => (
      <TasksSection
        boardId={currentBoard as string}
        columnId={columnId as string}
      />
    ),
    [currentBoard, columnId]
  );

  return (
    <S.ColumnWrapper
      style={style}
      ref={setNodeRef}
      id={columnId}
      className="column"
      $isDone={doneColumn === columnId}
    >
      {!!currentColumn ? (
        <>
          <S.DnDAnchor
            name="drag"
            color={iconColor}
            {...attributes}
            {...listeners}
          />
          <S.ColumnLabel>
            <S.ColumnText>{toUpper(currentColumn.title)}</S.ColumnText>
          </S.ColumnLabel>

          {MemoizedTaskSection}

          <CreateTask columnName={currentColumn.title} />
        </>
      ) : null}
    </S.ColumnWrapper>
  );
};

export default React.memo(Column);
