import { RawDraftContentState } from 'draft-js';
import filter from 'lodash/filter';
import find from 'lodash/find';
import maxBy from 'lodash/maxBy';
import { SetURLSearchParams } from 'react-router-dom';

import Icon from '@common/icons/Icon';
import {
  IRawForCompare,
  ITask,
  ITaskPriority,
  ITaskType,
} from '@common/interfaces/ITask';
import { IColumn } from '@common/providers/boardProvider/types';

import {
  getBoardById,
  getCurrentBoardData,
  getCurrentBoardId,
} from './boardHelper';

export const getPriorityIcon = (
  priority?: ITaskPriority,
  size: number = 20
) => <Icon name={`priority-${priority}`} size={size} />;

export const getStoriesList = (): ITask[] | undefined => {
  const currentBoardData = getCurrentBoardData();
  if (currentBoardData) {
    return filter(
      currentBoardData.tasks,
      (task) => task.type === ITaskType.STORY
    );
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
  const currentBoardData = getCurrentBoardData();
  if (currentBoardData) {
    return find(currentBoardData.tasks, (task) => task.taskId === taskId);
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
      'invalid JSON data in description editor, this field will be empty. Data: ',
      contentJSON
    );
  }
};

export const prepareRawForCompare = (
  raw: RawDraftContentState
): IRawForCompare => ({
  entityMap: raw.entityMap,

  // eslint-disable-next-line unused-imports/no-unused-vars
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
