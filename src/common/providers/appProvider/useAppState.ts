import { create } from 'zustand';
import defaultState from './state';
import { IAppState, IModalProps } from './types';
import { filter } from 'lodash';

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
