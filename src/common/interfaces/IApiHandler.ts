export enum IApiMethod {
  GET = 'get',
  POST = 'post',
}

export interface IApiHandler {
  method: IApiMethod;
  url: string;
  payload?: Record<string, any>;
  withAuth?: boolean;
}

export enum ApiCalls {
  AUTH = '/auth/login',
  REGISTER = '/auth/signup',
  PROTECTED = '/auth/protected',
  BOARD = '/board/all',
  BOARD_CREATE = '/board/create',
  TASK_CREATE = '/task/create',
}

export interface ICustomResponse<T = undefined> {
  isSuccess: number;
  isError: number;
  message: string;
  payload?: T;
}
