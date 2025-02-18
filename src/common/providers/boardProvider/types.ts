import CustomError from '@common/api/error';
import { ITask } from '@common/interfaces/ITask';

export interface IBoardState {
  boardList: Record<string, IBoard> | null;
  loading: boolean;
  error: CustomError | null;
  currentTask: string | null;
}

export interface IBoard {
  items: string[];
  name: string;
  tasks: ITask[];
  createdAt: Date;
  _id: string;
}
