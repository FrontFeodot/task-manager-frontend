import { create } from 'zustand';

import defaultState from './state';
import { IAppState, IModal, IModalProps } from './types';

export const useAppState = create<IAppState>(() => defaultState);

export const openModal = <T>(currentModal: IModalProps): void => {
  useAppState.setState(() => ({
    currentModal,
  }));
};
export const closeModal = (): void => {
  useAppState.setState(() => ({
    currentModal: null,
  }));
};
