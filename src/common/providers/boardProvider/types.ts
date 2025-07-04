import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { IBoardList } from '@common/interfaces/IBoard';
import { ITask } from '@common/interfaces/ITask';

export interface IBoardState {
  boardList: IBoardList | null;
  loading: boolean;
  currentBoardId: string | null;
  openedEditor: IOpenedEditor | null;
  eventResult: ICustomResponse | null;
}

export interface IBoard {
  columns: Record<string, IColumn>;
  boardId: string;
  title: string;
  tasks: Record<number, ITask>;
  doneColumn: string | null;
  ownerEmail: string;
  members: string[];
  createdAt: Date;
}

export interface IColumn {
  title: string;
  columnId: string;
  order: number;
}

export interface IOpenedEditor {
  newField?: 'board' | 'column';
  result?: ICustomResponse<Partial<IBoard>> | null;
  data: IBoard;
}
