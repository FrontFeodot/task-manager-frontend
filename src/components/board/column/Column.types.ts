import { UniqueIdentifier } from '@dnd-kit/core';

import { ITask } from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';

export interface IColumnProps {
  column?: IColumn;
  taskSection?: ITask[];
  activeId: UniqueIdentifier | null;
  activeTask?: ITask;
  isDone?: boolean;
}
