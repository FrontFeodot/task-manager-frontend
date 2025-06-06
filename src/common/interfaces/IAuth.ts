export interface IPostRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IPostRegisterResponse {
  token: string;
}

export interface IPostLogin {
  email: string;
  password: string;
}

export interface IPostLoginResponse {
  token: string;
  email: string;
}
