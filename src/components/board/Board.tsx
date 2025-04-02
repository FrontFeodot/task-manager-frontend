import { useEffect, useState } from 'react';
import map from 'lodash/map';
import unionBy from 'lodash/unionBy';
import find from 'lodash/find';

import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  rectIntersection,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import Column from '@components/board/column/Column';
import EmptyLayout from '@components/layouts/emptyLayout/EmptyLayout';
import { IEmptyLayoutType } from '@components/layouts/emptyLayout/EmptyLayout.types';
import { getTaskById, getTasksForColumn } from '@common/helpers/taskHelper';
import { ITask } from '@common/interfaces/ITask';
import { IBoard, IColumn } from '@common/providers/boardProvider/types';
import { handleDragOverHelper } from '@common/helpers/dragAndDrop/dragOverHelper';
import {
  columnDragEnd,
  taskDragEnd,
} from '@common/helpers/dragAndDrop/dragEndHelper';

import * as S from './Board.styled';
import { IBoardProps } from './Board.types';

const Board = ({ boardData }: IBoardProps): JSX.Element => {
  const [virtualBoard, setVirtualBoard] = useState<IBoard | null | undefined>(
    boardData
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = useState<'tasks' | 'columns' | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setVirtualBoard(boardData || null);
  }, [boardData]);

  if (!virtualBoard) {
    return <EmptyLayout type={IEmptyLayoutType.BOARD} />;
  }

  const { columns, tasks } = virtualBoard;
  const activeTask = getTaskById(activeId as number);
  const activeColumn: IColumn | null | undefined =
    activeItem === 'columns'
      ? (find(columns, { columnId: activeId }) as IColumn)
      : null;

  const updateBoardState = (updatedData: ITask[] | IColumn[]): void => {
    setVirtualBoard((prev) => {
      if (prev) {
        return {
          ...prev,
          ...(activeItem === 'tasks'
            ? { tasks: unionBy(updatedData as ITask[], prev.tasks, 'taskId') }
            : { columns: updatedData as IColumn[] }),
        };
      }
    });
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const itemType = active.data.current?.type || 'tasks';

    setActiveId(active.id);
    setActiveItem(itemType);
  };

  const handleDragOver = ({ active, over }: DragOverEvent): void => {
    if (!activeItem) return;

    const dataToUpdate: ITask[] | IColumn[] =
      activeItem === 'tasks' ? tasks : columns;

    const updatedData = handleDragOverHelper({
      active,
      over,
      [activeItem]: dataToUpdate,
    });

    if (!updatedData) return;

    setHasChanges(true);
    updateBoardState(updatedData);
  };

  const handleDragEnd = async ({ over }: DragEndEvent): Promise<void> => {
    if (!over) {
      setActiveId(null);
      setActiveItem(null);
      return;
    }

    if (hasChanges) {
      setHasChanges(false);
      if (activeItem === 'tasks') {
        const initialColumnId = activeTask?.columnId;
        taskDragEnd(over, virtualBoard.tasks, initialColumnId);
      }
      if (activeItem === 'columns') {
        await columnDragEnd(virtualBoard.boardId, columns);
      }
    }

    setActiveId(null);
    setActiveItem(null);
  };

  return (
    <S.BoardWrapper>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        {map(columns, (column) => {
          const currentTaskSection = getTasksForColumn(column.columnId, tasks);
          return (
            <Column
              taskSection={currentTaskSection}
              column={column}
              activeId={activeId}
              activeTask={activeTask}
              key={column.columnId}
            />
          );
        })}
        <Column activeId={activeId} activeTask={activeTask} />
        {activeColumn?.columnId ? (
          <DragOverlay>
            <Column
              taskSection={getTasksForColumn(activeId as string, tasks)}
              column={activeColumn}
              activeId={activeId}
            />
          </DragOverlay>
        ) : null}
      </DndContext>
    </S.BoardWrapper>
  );
};

export default Board;
