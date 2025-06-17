import { ITask } from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';

import { UniqueIdentifier } from '@dnd-kit/core';

export interface IColumnProps {
  column?: IColumn;
  taskSection?: ITask[];
  activeId: UniqueIdentifier | null;
  activeTask?: ITask;
  isDone?: boolean;
}
