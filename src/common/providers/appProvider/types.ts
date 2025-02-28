export interface IAppState {
  currentModal: IModal | null;
}

export enum IModal {
  TASK_MODAL = 'TASK_MODAL',
  CREATE_TASK = 'CREATE_TASK',
}
