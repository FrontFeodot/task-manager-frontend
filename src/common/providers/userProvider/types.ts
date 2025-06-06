export interface IUser {
  isLoggedIn: boolean;
  loading: boolean;
  data: IUserData | null;
}

export interface IUserData {
  email: string;
}
