export enum IApiMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IApiHandler<Req> {
  method: IApiMethod;
  url: ApiCalls;
  payload?: Req;
  withAuth?: boolean;
}

export enum ApiCalls {
  PING = '/ping',
  AUTH = '/auth/login',
  REGISTER = '/auth/signup',
  PROTECTED = '/auth/protected',
  BOARD = '/board/all',
  BOARD_CREATE = '/board/create',
  BOARD_DELETE = '/board/delete',
  TASK_CREATE = '/task/create',
  TASK_UPDATE = '/task/update',
  TASK_DELETE = '/task/delete',
}

export interface ICustomResponse<T = undefined> {
  isSuccess: number;
  isError: number;
  message: string;
  payload?: T;
}
