import { IModal, IModalProps } from '@common/providers/appProvider/types';
import { useAppState } from '@common/providers/appProvider/useAppState';
import { find } from 'lodash';

export const getCurrentModal = (modalName: IModal): IModalProps | undefined => {
  const modals = useAppState.getState().modals;
  return find(modals, (modal) => modal.name === modalName);
};

export const isDesktopView = () => window.innerWidth >= 1280;
