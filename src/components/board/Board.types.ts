import { IBoard } from '@common/providers/boardProvider/types';

export interface IBoardProps {
  boardData?: IBoard;
  loading: boolean;
}
