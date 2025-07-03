import { throttle } from 'lodash';

import {
  columnDragEnd,
  taskDragEnd,
} from '@common/helpers/dragAndDrop/dragEndHelper';
import { handleDragOverHelper } from '@common/helpers/dragAndDrop/dragOverHelper';
import {
  setDraggingItem,
  useDndState,
} from '@common/providers/dndProvider/useDndState';

import { IUseDndState } from './useDndHandlers.types';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const useDndHandlers = (): IUseDndState => {
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

  const handleDragStart = ({ active }: DragStartEvent) => {
    const itemType: 'tasks' | 'columns' = active.data.current?.type || 'tasks';
    setDraggingItem({
      itemId: active.id,
      type: itemType,
      columnId: active.data.current?.sortable?.containerId,
    });
  };

  const handleDragOver = throttle(({ active, over }: DragOverEvent) => {
    const draggingItem = useDndState.getState().draggingItem;

    const sourceTaskColumnId = active.data.current?.sortable
      ?.containerId as string;
    const targetTaskColumnId = over?.data.current?.sortable
      ?.containerId as string;
    const sourceId = active.id;
    const targetId = over?.id;

    if (
      !draggingItem ||
      !targetId ||
      !sourceId ||
      sourceId === targetId ||
      (targetId === sourceTaskColumnId &&
        sourceTaskColumnId === targetTaskColumnId) ||
      (targetId && !targetTaskColumnId)
    )
      return;

    handleDragOverHelper({
      type: draggingItem.type,
      sourceId,
      targetId,
      sourceTaskColumnId,
      targetTaskColumnId,
    });
  }, 100);

  const handleDragEnd = async (data: DragEndEvent): Promise<void> => {
    const { over } = data;
    const draggingItem = useDndState.getState().draggingItem;

    if (!over) {
      setDraggingItem(null);
      return;
    }

    if (draggingItem?.type === 'tasks') {
      const initialColumnId = draggingItem?.columnId;
      taskDragEnd({
        initialColumnId,
        targetColumnId: over.data.current?.sortable?.containerId || over.id,
      });
    }
    if (draggingItem?.type === 'columns') {
      columnDragEnd();
    }
    setDraggingItem(null);
  };

  return {
    dndContext: {
      sensors,
      collisionDetection: rectIntersection,
      onDragStart: handleDragStart,
      onDragOver: handleDragOver,
      onDragEnd: handleDragEnd,
      modifiers: [restrictToWindowEdges],
    },
  };
};

export default useDndHandlers;
