import { find, map } from 'lodash';

import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { IColumn } from '@common/providers/boardProvider/types';
import { getCurrentBoardTitle } from './boardHelper';

export const getColumns = (): IColumn[] => {
  const currentBoard = getCurrentBoardTitle();
  return useBoardState.getState().boardList?.[currentBoard]
    .columns as IColumn[];
};

export const getColumnTitles = (): string[] => {
  const columns = getColumns();
  return map(columns, (column) => column.title);
};

export const getColumn = ({
  columnTitle,
  columnId,
}: {
  columnTitle?: string;
  columnId?: string;
}): IColumn | undefined => {
  const currentBoard = getCurrentBoardTitle();
  const columns = useBoardState?.getState()?.boardList?.[currentBoard]?.columns;
  if (!columns) {
    return undefined;
  }

  return find(columns, (column) => {
    if (columnTitle) {
      return column.title === columnTitle;
    }
    if (columnId) {
      return column.columnId === columnId;
    }
    return undefined;
  }) as IColumn | undefined;
};
