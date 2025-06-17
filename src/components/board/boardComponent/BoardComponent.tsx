import find from 'lodash/find';
import map from 'lodash/map';
import { useState } from 'react';

import {
  columnDragEnd,
  taskDragEnd,
} from '@common/helpers/dragAndDrop/dragEndHelper';
import { handleDragOverHelper } from '@common/helpers/dragAndDrop/dragOverHelper';
import { getTaskById, getTasksForColumn } from '@common/helpers/taskHelper';
import { ITask } from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';

import Column from '@components/board/column/Column';

import * as S from './BoardComponent.styled';
import { IBoardComponent } from './BoardComponent.types';
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
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const BoardComponent = ({
  boardData,
  updateBoardState,
}: IBoardComponent): JSX.Element => {
  const { columns, tasks, doneColumn } = boardData;

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

  const activeTask = getTaskById(activeId as number);
  const activeColumn: IColumn | null | undefined =
    activeItem === 'columns'
      ? (find(columns, { columnId: activeId }) as IColumn)
      : null;

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
    updateBoardState(updatedData, activeItem);
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
        taskDragEnd(over, boardData.tasks, doneColumn, initialColumnId);
      }
      if (activeItem === 'columns') {
        await columnDragEnd(boardData.boardId, columns);
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
              isDone={doneColumn === column.columnId}
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

export default BoardComponent;
