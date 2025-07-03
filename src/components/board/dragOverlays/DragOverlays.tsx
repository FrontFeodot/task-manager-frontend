import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { useDndState } from '@common/providers/dndProvider/useDndState';

import Column from '../columnList/column/Column';
import TaskCardWrapper from '../tasksSection/tasks/TaskCardWrapper';
import { DragOverlay } from '@dnd-kit/core';

const DragOverlays: React.FC = () => {
  const boardId = useBoardState((state) => state.currentBoardId);
  const draggingItem = useDndState((state) => state.draggingItem);

  return (
    <DragOverlay>
      {draggingItem?.type === 'tasks' && draggingItem.itemId ? (
        <TaskCardWrapper
          taskId={draggingItem.itemId as number}
          sectionId={draggingItem.columnId as string}
          boardId={boardId!}
        />
      ) : null}
      {draggingItem?.type === 'columns' && draggingItem?.columnId ? (
        <Column columnId={draggingItem.columnId} />
      ) : null}
    </DragOverlay>
  );
};

export default DragOverlays;
