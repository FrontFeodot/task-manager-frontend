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
export const setSingleBoard = (board: IBoard): void =>
  useBoardState.setState((state) => {
    if (state.boardList?.[board.boardId])
      state.boardList[board.boardId!] = board;
  });
export const setCurrentBoard = (currentBoardId: string | null): void =>
  useBoardState.setState(() => ({
    currentBoardId,
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
  useBoardState.setState((state) => {
    if (state) {
      state.loading = loading;
    }
  });

export const setBoardEditorResult = (
  result: ICustomResponse<Partial<IBoard>> | null
) =>
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
    const currentBoardTasks = state.boardList![boardId].tasks;
    if (!currentBoardTasks) return;
    updatedTasks.forEach((upd) => {
      currentBoardTasks[upd.taskId!] = {
        ...currentBoardTasks[upd.taskId!],
        ...upd,
      };
    });
  });
};
export const setUpdatedTask = (updatedTask: ITask) => {
  useBoardState.setState((state) => {
    const currentBoardTasks = state.boardList![updatedTask.boardId].tasks;
    const currentTask = currentBoardTasks[updatedTask.taskId];
    currentBoardTasks[updatedTask.taskId] = {
      ...(currentTask ? { ...currentTask } : {}),
      ...updatedTask,
    };
  });
};

export const removeDeletedTask = (taskId: number, boardId: string) => {
  useBoardState.setState((state) => {
    const currentBoardTasks = state.boardList![boardId].tasks;

    delete currentBoardTasks[taskId];
  });
};
