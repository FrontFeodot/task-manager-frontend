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
  TASK_CREATE = '/task/create',
  COLUMN_CREATE = '/column/create',
}
