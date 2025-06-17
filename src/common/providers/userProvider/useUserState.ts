import { create } from 'zustand';

import defaultState from './state';
import { IUser, IUserData } from './types';

export const useUserState = create<IUser>(() => defaultState);

export const setUserData = (data: IUserData | null): void =>
  useUserState.setState({ data });

export const setLoginUser = (isLoggedIn: boolean): void =>
  useUserState.setState({ isLoggedIn });

export const setUserLoading = (loading: boolean): void =>
  useUserState.setState({ loading });
