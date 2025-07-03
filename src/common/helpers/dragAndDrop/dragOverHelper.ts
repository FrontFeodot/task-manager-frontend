import { IDragOverHelper } from '@common/interfaces/IDnd';
import { ITask } from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';
import {
  handleDragOverColumns,
  handleDragOverTasks,
} from '@common/providers/dndProvider/useDndState';

export const handleDragOverHelper = ({
  type,
  sourceId,
  targetId,
  sourceTaskColumnId,
  targetTaskColumnId,
}: IDragOverHelper): ITask[] | IColumn[] | void => {
  if (type === 'columns') {
    handleDragOverColumns({
      sourceId,
      targetId: typeof targetId === 'number' ? targetTaskColumnId! : targetId,
    });
    return;
  }

  if (type === 'tasks') {
    handleDragOverTasks({
      sourceId,
      targetId,
      sourceTaskColumnId,
      targetTaskColumnId,
    });
  }
};
