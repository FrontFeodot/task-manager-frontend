export enum IApiMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

export interface IApiHandler {
  method: IApiMethod;
  url: ApiCalls;
  payload?: Record<string, any>;
  withAuth?: boolean;
}

export enum ApiCalls {
  AUTH = '/auth/login',
  REGISTER = '/auth/signup',
  PROTECTED = '/auth/protected',
  BOARD = '/board/all',
  BOARD_CREATE = '/board/create',
  UPDATE_TASKS_ORDER = '/board/update/tasks',
  UPDATE_COLUMNS_ORDER = '/board/update/columns',
  TASK_CREATE = '/task/create',
  TASK_UPDATE = '/task/update',
}

export interface ICustomResponse<T = undefined> {
  isSuccess: number;
  isError: number;
  message: string;
  payload?: T;
}
