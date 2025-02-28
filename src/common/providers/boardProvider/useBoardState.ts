import { create } from 'zustand';

import defaultState from './state';
import { IBoard, IBoardState } from './types';

export const useBoardState = create<IBoardState>(() => defaultState);

export const setBoardsList = (boardList: Record<string, IBoard>): void => {
  useBoardState.setState(() => ({
    boardList,
  }));
};
