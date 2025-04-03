import { IBoardList } from '@common/interfaces/IBoard';
import { ITask } from '@common/interfaces/ITask';

export interface IBoardState {
  boardList: IBoardList | null;
  loading: boolean;
  currentBoardTitle: string | null;
  openedEditor: IOpenedEditor | null;
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

export interface IOpenedEditor {
  newField?: 'board' | 'column';
  data: IBoard;
}
