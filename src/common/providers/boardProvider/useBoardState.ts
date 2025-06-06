import { create } from 'zustand';

import defaultState from './state';
import { IBoard, IBoardState, IOpenedEditor } from './types';

export const useBoardState = create<IBoardState>(() => defaultState);

export const setBoardsList = (boardList: Record<string, IBoard>): void =>
  useBoardState.setState(() => ({
    boardList,
  }));
export const setCurrentBoard = (currentBoardTitle: string | null): void =>
  useBoardState.setState(() => ({
    currentBoardId: currentBoardTitle,
  }));
export const openEditor = (openedEditor: IOpenedEditor): void =>
  useBoardState.setState(() => ({
    openedEditor,
  }));
export const closeEditor = (): void =>
  useBoardState.setState(() => ({
    openedEditor: null,
  }));
export const resetBoardList = (): void =>
  useBoardState.setState(() => defaultState);
export const setBoardLoading = (loading: boolean): void =>
  useBoardState.setState(() => ({
    loading,
  }));
