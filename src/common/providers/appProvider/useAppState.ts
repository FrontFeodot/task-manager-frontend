import { filter } from 'lodash';
import { create } from 'zustand';

import defaultState from './state';
import { IAppState, IModalProps } from './types';

export const useAppState = create<IAppState>(() => defaultState);

export const openModal = (modal: IModalProps): void => {
  useAppState.setState((state) => ({
    modals: [
      ...state.modals,
      {
        ...modal,
      },
    ],
  }));
};
export const closeModal = (closedModal: string): void => {
  useAppState.setState((state) => ({
    modals: filter(state.modals, (modal) => modal.name !== closedModal),
  }));
};

export const toggleAppLoading = (appLoading: boolean): void =>
  useAppState.setState(() => ({
    appLoading,
  }));

export const setAppError = (appError: string | null): void =>
  useAppState.setState(() => ({
    appError,
  }));
