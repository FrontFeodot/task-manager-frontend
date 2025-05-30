import { SetURLSearchParams } from 'react-router-dom';
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from 'react-icons/fc';
import filter from 'lodash/filter';
import find from 'lodash/find';
import maxBy from 'lodash/maxBy';
import { RawDraftContentState } from 'draft-js';

import {
  IRawForCompare,
  ITask,
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from '@common/interfaces/ITask';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { IColumn } from '@common/providers/boardProvider/types';

import {
  getBoardById,
  getCurrentBoardId,
  getCurrentBoardTitle,
} from './boardHelper';

export const getPriorityIcon = (
  priority?: ITaskPriority,
  size: number = 20
) => {
  switch (priority) {
    case ITaskPriority.LOW:
      return <FcLowPriority size={size} />;
    case ITaskPriority.MEDIUM:
      return <FcMediumPriority size={size} />;
    case ITaskPriority.HIGH:
      return <FcHighPriority size={size} />;
    default:
      return <></>;
  }
};

export const getStatusLabel = (status: ITaskStatus): string => {
  switch (status) {
    case ITaskStatus.TO_DO:
      return 'To do';
    case ITaskStatus.IN_PROGRESS:
      return 'In progress';
    case ITaskStatus.DONE:
      return 'Done';
    default:
      return 'Icebox';
  }
};

export const getStoriesList = (): ITask[] | undefined => {
  const currentBoard = getCurrentBoardTitle();
  if (currentBoard) {
    const allTasks = useBoardState.getState().boardList?.[currentBoard].tasks;

    return filter(allTasks, (task) => task.type === ITaskType.STORY);
  }
};

export const getParentTask = (parentTaskId: number): ITask | undefined => {
  const stories = getStoriesList();
  const boardId = getCurrentBoardId();
  return find(
    stories,
    (story) => story.taskId === parentTaskId && story.boardId === boardId
  );
};

export const getTasksForColumn = (columnId: string, tasks: ITask[]) =>
  filter(tasks, ['columnId', columnId]).sort((a, b) => a.order - b.order);

interface IGetLastOrderByType {
  type: 'columns' | 'tasks';
  columnId?: string;
  boardId: string;
}

export const getLastOrderByType = ({
  type,
  columnId,
  boardId,
}: IGetLastOrderByType): number => {
  const board = getBoardById(boardId);

  if (!board) {
    return 1;
  }

  const { columns, tasks } = board;

  if (type === 'columns') {
    const lastOrderItem = maxBy(columns, 'order');
    return lastOrderItem?.order || 0;
  }

  const currentColumn = find(
    columns,
    (column) => column.columnId === columnId
  ) as IColumn;
  const taskList = getTasksForColumn(currentColumn?.columnId, tasks);
  const lastOrderItem = maxBy(taskList, 'order');
  return lastOrderItem ? lastOrderItem.order + 1 : 1;
};

export const getTaskById = (taskId: number): ITask | undefined => {
  const currentBoard = getCurrentBoardTitle();
  if (currentBoard) {
    const allTasks = useBoardState.getState().boardList?.[currentBoard].tasks;

    return find(allTasks, (task) => task.taskId === taskId);
  }
};

export const closeTaskModal = (setSearchParams: SetURLSearchParams): void => {
  const newSearchParams = new URLSearchParams();
  newSearchParams.delete('taskId');
  setSearchParams(newSearchParams);
};

export const getRawDescriptionContent = (
  contentJSON: string
): RawDraftContentState | void => {
  try {
    const raw = JSON.parse(contentJSON);
    return raw;
  } catch {
    console.error(
      'invalid JSON data in description editor, this field will be empty. Data: '
    );
    console.log(contentJSON);
  }
};

export const prepareRawForCompare = (
  raw: RawDraftContentState
): IRawForCompare => ({
  entityMap: raw.entityMap,
  blocks: raw.blocks.map(({ key, ...rest }) => rest),
});

export const isDescriptionChanged = (
  current: RawDraftContentState,
  initial: RawDraftContentState
) => {
  const parsedInitial = prepareRawForCompare(initial);
  const parsedCurrent = prepareRawForCompare(current);

  return JSON.stringify(parsedInitial) !== JSON.stringify(parsedCurrent);
};
