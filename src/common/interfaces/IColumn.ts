export interface IDeleteTask {
  boardId: string;
  columnId: string;
  tasksPath?: 'remove' | string;
}
