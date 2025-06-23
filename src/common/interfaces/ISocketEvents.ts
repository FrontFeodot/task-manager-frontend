import { ITask } from './ITask';

export interface IManageColumn {
  boardId: string;
  title?: string;
  order?: number;
  columnId?: string;
  isDelete?: boolean;
  tasksPath?: string;
}

export interface IManageMembers {
  type: 'share' | 'leave' | 'kick';
  boardId: string;
  memberEmail: string;
}

export interface ITasksUpdated {
  boardId: string;
  updatedTasks: Partial<ITask>[];
}
