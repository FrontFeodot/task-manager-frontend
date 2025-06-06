import { IUser } from './types';

const defaultState: IUser = {
  isLoggedIn: false,
  loading: true,
  data: null,
};

export default defaultState;
