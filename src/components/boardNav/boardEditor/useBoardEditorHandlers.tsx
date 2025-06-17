import { useState } from 'react';
import { SyntheticEvent } from 'react-draft-wysiwyg';

import {
  deleteBoardApi,
  getBoards,
} from '@common/api/boardApi';
import {
  manageMembersEvent,
  updateBoardData,
} from '@common/api/socket/socket';
import { getColumn } from '@common/helpers/columnHelper';
import { IModal } from '@common/providers/appProvider/types';
import { openModal } from '@common/providers/appProvider/useAppState';
import {
  closeEditor,
} from '@common/providers/boardProvider/useBoardState';

import { IUseBoardHandlers } from './BoardEditor.types';

const SELECT_COLUMN_TITLE = 'Select column as "done" column?';
const SELECT_COLUMN_MESSAGE =
  'All tasks in this column will be with "done" status';
const UNSELECT_COLUMN_TITLE = 'Remove "done" status from this column?';
const UNSELECT_COLUMN_MESSAGE =
  'After this action, new tasks in this column will not have the "done" status';

export const useBoardEditorHandlers = ({
  boardId,
  editorData,
}: IUseBoardHandlers) => {
  const [isSelectModeActive, setSelectColumnMode] = useState(false);

  const toggleSelectMode = (): void => {
    setSelectColumnMode(!isSelectModeActive);
  };

  const handleListClick = async (e: SyntheticEvent) => {
    if (!isSelectModeActive) return;

    const target = e.target as HTMLDivElement;
    const columnItem = target.closest(
      '.settings-column-item'
    ) as HTMLDivElement;
    if (!columnItem) return;

    const columnTitle = columnItem.dataset.value?.replace(/_/g, ' ');
    if (!columnTitle) return;

    const column = getColumn({ columnTitle });
    if (!column?.columnId) return;

    setSelectColumnMode(false);

    const isDoneColumn = column.columnId === editorData.doneColumn;

    openModal({
      name: IModal.CONFIRM_MODAL,
      data: {
        title: isDoneColumn ? UNSELECT_COLUMN_TITLE : SELECT_COLUMN_TITLE,
        message: isDoneColumn ? UNSELECT_COLUMN_MESSAGE : SELECT_COLUMN_MESSAGE,
        args: [{ boardId, doneColumn: isDoneColumn ? null : column.columnId }],
        callback: updateBoardData,
      },
    });
  };

  const getMembersActionData = (
    type: 'leave' | 'kick' | 'delete',
    boardId: string,
    memberEmail?: string
  ) => {
    switch (type) {
      case 'leave':
        return {
          title: 'Are you sure you want to leave this board?',
          message: 'You will no longer be able to interact with this board.',
          args: [type, boardId, memberEmail],
          callback: membersCallback,
        };
      case 'kick':
        return {
          title: 'Are you sure you want to kick this member?',
          message:
            'This member will no longer be able to interact with this board.',
          args: [type, boardId, memberEmail],
          callback: membersCallback,
        };
      case 'delete':
        return {
          title: 'Delete the board?',
          message: 'Tasks and columns from this board will be removed too',
          args: [boardId],
          callback: deleteBoard,
        };
    }
  };

  const membersCallback = (
    type: 'leave' | 'kick',
    boardId: string,
    memberEmail: string
  ) => {
    manageMembersEvent({ type, boardId, memberEmail });

    if (type === 'leave') {
      closeEditor();
    }
  };

  const deleteBoard = async (boardId: string) => {
    try {
      const response = await deleteBoardApi(boardId);
      if (!response) {
        throw response;
      }
      closeEditor();
      getBoards();
    } catch (err) {
      return err;
    }
  };

  const onButtonsAction = (
    type: 'leave' | 'kick' | 'delete',
    memberEmail?: string
  ): void => {
    const data = getMembersActionData(type, boardId, memberEmail);

    openModal({
      name: IModal.CONFIRM_MODAL,
      data,
    });
  };

  return {
    isSelectModeActive,
    onButtonsAction,
    handleListClick,
    toggleSelectMode,
  };
};
