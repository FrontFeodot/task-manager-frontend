export interface ITask {
  name: string;
  userId: string;
  status?: ITaskStatus;
  priority?: ITaskPriority;
  description?: string;
  customFields?: Record<string, string>;
  type?: ITaskType;
  parentTask?: string;
  board: string;
  column: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ITaskStatus {
  TO_DO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
  DEFAULT = 'default',
}

export enum ITaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ITaskType {
  TASK = 'task',
  STORY = 'story',
}
