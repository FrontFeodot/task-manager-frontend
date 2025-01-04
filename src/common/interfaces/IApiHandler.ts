export enum IApiMethod {
  GET = 'get',
  POST = 'post',
}

export interface IApiHandler {
  method: IApiMethod;
  url: string;
  payload: Record<string, any>;
}
