import { IModalProps } from '@common/providers/appProvider/types';
import { useAppState } from '@common/providers/appProvider/useAppState';

export const parseValueToClassName = (value: string): string =>
  value.split(' ').join('_');

export const getCurrentModal = (): IModalProps | null => {
  return useAppState.getState().currentModal;
};
