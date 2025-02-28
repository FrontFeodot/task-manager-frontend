import { create } from 'zustand';

import defaultState from './state';
import { IAppState, IModal } from './types';

export const useAppState = create<IAppState>(() => defaultState);

export const openModal = (currentModal: IModal): void => {
  useAppState.setState(() => ({
    currentModal,
  }));
};
export const closeModal = (): void => {
  useAppState.setState(() => ({
    currentModal: null,
  }));
};
