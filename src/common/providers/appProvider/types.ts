export interface IAppState {
  currentModal: IModalProps | null;
}

export interface IModalProps {
  name: IModal;
  data?: Record<string, string | any>;
}

export enum IModal {
  TASK_MODAL = 'TASK_MODAL',
  CREATE_TASK = 'CREATE_TASK',
  DELETE_COLUMN_CONFIRM = 'DELETE_COLUMN_CONFIRM',
  CONFIRM_MODAL = 'CONFIRM_MODAL',
}
