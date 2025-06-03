import { ITaskPriority } from '@common/interfaces/ITask';

export interface ITaskGradientBar {
  priority: ITaskPriority;
  isDone: boolean;
}
