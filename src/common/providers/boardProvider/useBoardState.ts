import { create } from 'zustand';

import defaultState from './state';
import { IBoard, IBoardState } from './types';

export const useBoardState = create<IBoardState>(() => defaultState);

export const setBoardsList = (boardList: Record<string, IBoard>): void => {
  useBoardState.setState(() => ({
    boardList,
  }));
};

export const setCurrentBoard = (currentBoardTitle: string | null): void => {
  useBoardState.setState(() => ({
    currentBoardTitle,
  }));
};

export const openEditor = (openedEditor: IBoard): void => {
  useBoardState.setState(() => ({
    openedEditor,
  }));
};
export const closeEditor = (): void => {
  useBoardState.setState(() => ({
    openedEditor: null,
  }));
};
