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
  AUTH = '/auth/login',
  REGISTER = '/auth/signup',
  PROTECTED = '/auth/protected',
  BOARD = '/board/all',
  BOARD_CREATE = '/board/create',
  BOARD_DELETE = '/board/delete',
  BOARD_UPDATE_TITLE = '/board/update/title',
  BOARD_UPDATE_DONE_COLUMN = '/board/update/done-column',
  UPDATE_TASKS_ORDER = '/board/update/tasks',
  UPDATE_COLUMNS_ORDER = '/board/update/columns',
  TASK_CREATE = '/task/create',
  TASK_UPDATE = '/task/update',
  TASK_DELETE = '/task/delete',
  COLUMN_CREATE = '/column/create',
  COLUMN_UPDATE = '/column/update',
  COLUMN_DELETE = '/column/delete',
}

export interface ICustomResponse<T = undefined> {
  isSuccess: number;
  isError: number;
  message: string;
  payload?: T;
}
