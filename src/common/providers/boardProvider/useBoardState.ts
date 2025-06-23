import { assign, remove } from 'lodash';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { ITasksUpdated } from '@common/interfaces/ISocketEvents';
import { ITask } from '@common/interfaces/ITask';

import defaultState from './state';
import { IBoard, IBoardState, IOpenedEditor } from './types';

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

export const setEventResult = (result: ICustomResponse | null) =>
  useBoardState.setState((state) => {
    state.eventResult = result;
  });

export const setBoardData = (boardData: Partial<IBoard>) => {
  const { boardId } = boardData;
  if (!boardId) {
    return;
  }
  useBoardState.setState((state) => {
    const currentBoard = state!.boardList![boardId];

    state!.boardList![boardId] = { ...currentBoard, ...boardData };
  });
};

export const setMultiplyTasks = ({ boardId, updatedTasks }: ITasksUpdated) => {
  useBoardState.setState((state) => {
    const currentBoard = state.boardList![boardId];
    if (!currentBoard) return;
    updatedTasks.forEach((upd) => {
      const idx = currentBoard.tasks.findIndex(
        (task) => task.taskId === upd.taskId
      );
      if (idx !== -1) {
        Object.assign(currentBoard.tasks[idx], upd);
      }
    });
  });
};
export const setUpdatedTask = (updatedTask: ITask) => {
  useBoardState.setState((state) => {
    const currentBoard = state.boardList![updatedTask.boardId];
    const idx = currentBoard.tasks.findIndex(
      (task) => task.taskId === updatedTask.taskId
    );
    if (idx !== -1) {
      assign(currentBoard.tasks[idx], updatedTask);
      return;
    }
    currentBoard.tasks.push(updatedTask);
  });
};

export const removeDeletedTask = (taskId: number, boardId: string) => {
  useBoardState.setState((state) => {
    const currentBoard = state.boardList![boardId];
    const idx = currentBoard.tasks.findIndex((task) => task.taskId === taskId);

    if (idx !== -1) {
      remove(currentBoard.tasks, { taskId });
    }
  });
};
