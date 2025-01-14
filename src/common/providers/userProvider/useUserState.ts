import { create } from 'zustand';

interface IUser {
  isLoggedIn: boolean;
}

const defaultState: IUser = {
  isLoggedIn: false,
};

export const useUserState = create<IUser>(() => defaultState);

export const setLoginUser = (isLoggedIn: boolean): void =>
  useUserState.setState({ isLoggedIn });
