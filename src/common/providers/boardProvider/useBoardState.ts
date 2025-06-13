import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import defaultState from './state';
import { IBoard, IBoardState, IOpenedEditor } from './types';
import { assign, omit } from 'lodash';
import { ICustomResponse } from '@common/interfaces/IApiHandler';

export const useBoardState = create<IBoardState>()(immer((_) => defaultState));

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

export const setBoardEditorResult = (result: ICustomResponse | null) =>
  useBoardState.setState((state) => {
    if (!state.openedEditor) return;

    state.openedEditor.result = result;
  });

export const setBoardData = (boardData: Partial<IBoard>) => {
  const { boardId } = boardData;
  if (!boardId) {
    return;
  }
  useBoardState.setState((state) => {
    const currentBoard = state!.boardList![boardId];

    state!.boardList![boardId] = { ...currentBoard, ...boardData };
    console.log('new data setted => ', { ...currentBoard, ...boardData });
  });
};
