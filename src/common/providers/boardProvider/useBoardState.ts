import { create } from 'zustand';
import defaultState from './state';
import { IBoard, IBoardState } from './types';
import Cookies from 'js-cookie';

export const useBoardState = create<IBoardState>(() => defaultState);

export const setBoardsList = (boardList: Record<string, IBoard>): void => {
  useBoardState.setState(() => ({
    boardList,
  }));
};
