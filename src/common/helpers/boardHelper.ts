import Cookies from 'js-cookie';

import { SELECTED_BOARD } from '@common/utils/cookies';

export const getCurrentBoard = (): string => {
  return Cookies.get(SELECTED_BOARD) || '';
};
