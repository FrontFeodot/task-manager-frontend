import { create } from 'zustand';

import { IUser } from './types';
import defaultState from './state';

export const useUserState = create<IUser>(() => defaultState);

export const setLoginUser = (isLoggedIn: boolean): void =>
  useUserState.setState({ isLoggedIn });
