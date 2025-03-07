import { ITask } from '@common/interfaces/ITask';

export interface ITaskComponent {
  task: ITask;
  columnList: string[];
  closeTask: () => void;
}
