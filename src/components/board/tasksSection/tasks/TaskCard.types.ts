import { ITaskPriority } from '@common/interfaces/ITask';

export interface ITaskCardProps {
  taskId: number;
  title: string;
  parsedDescription: string;
  priority: ITaskPriority;
  isDone: boolean;
}
