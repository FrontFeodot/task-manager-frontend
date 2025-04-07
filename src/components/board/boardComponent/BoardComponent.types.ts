import { ITask } from '@common/interfaces/ITask';
import { IBoard, IColumn } from '@common/providers/boardProvider/types';

export interface IBoardComponent {
  boardData: IBoard;
  updateBoardState: (
    updatedData: ITask[] | IColumn[],
    activeItem: 'tasks' | 'columns' | null
  ) => void;
}
