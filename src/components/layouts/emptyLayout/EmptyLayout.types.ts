export interface IEmptyLayout {
  type: IEmptyLayoutType;
}

export interface IGetEmptyLayoutData {
  textContent: string;
  textLink: string;
  callback: () => void;
}

export enum IEmptyLayoutType {
  BOARD = 'board',
  COLUMN = 'column',
  TASK = 'task',
}
