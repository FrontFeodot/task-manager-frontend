import { IBoardList } from '@common/interfaces/IBoard';
import { ITask } from '@common/interfaces/ITask';

export interface IBoardState {
  boardList: IBoardList | null;
  loading: boolean;
  isError: number;
  currentTask: string | null;
}

export interface IBoard {
  columns: IColumn[];
  boardId: string;
  title: string;
  tasks: ITask[];
  createdAt: Date;
}

export interface IColumn {
  title: string;
  columnId: string;
  order: number;
}
