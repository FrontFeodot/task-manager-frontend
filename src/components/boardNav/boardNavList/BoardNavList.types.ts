import { IBoardList } from '@common/interfaces/IBoard';

export interface IBoardNavList {
  boardList?: IBoardList | null;
  isExpanded: boolean;
}
