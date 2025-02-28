import { ITask } from '@common/interfaces/ITask';

export interface IBoardState {
  boardList: Record<string, IBoard> | null;
  loading: boolean;
  isError: number;
  currentTask: string | null;
}

export interface IBoard {
  columns: string[];
  name: string;
  tasks: ITask[];
  createdAt: Date;
}
