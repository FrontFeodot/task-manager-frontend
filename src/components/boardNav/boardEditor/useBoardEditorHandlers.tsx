import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { ISaveButtonHandler, IUseBoardHandlers } from './BoardEditor.types';
import {
  boardMemberApi,
  createBoard,
  deleteBoard,
  shareBoard,
  updateBoardTitle,
  updateDoneColumn,
} from '@common/api/boardApi';
import { setCurrentBoardAction } from '@common/helpers/boardHelper';
import { createColumnHelper, getColumn } from '@common/helpers/columnHelper';
import { updateColumn } from '@common/api/columnApi';
import { useState } from 'react';
import {
  closeEditor,
  openEditor,
} from '@common/providers/boardProvider/useBoardState';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';
import { SyntheticEvent } from 'react-draft-wysiwyg';

const SELECT_COLUMN_TITLE = 'Select column as "done" column?';
const SELECT_COLUMN_MESSAGE =
  'All tasks in this column will be with "done" status';
const UNSELECT_COLUMN_TITLE = 'Remove "done" status from this column?';
const UNSELECT_COLUMN_MESSAGE =
  'After this action, new tasks in this column will not have the "done" status';

export const useBoardEditorHandlers = ({
  setUpdatedData,
  boardId,
  editorData,
}: IUseBoardHandlers) => {
  const [isSelectModeActive, setSelectColumnMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSelectMode = (): void => {
    setSelectColumnMode(!isSelectModeActive);
  };

  const handleDoneColumn = async (columnId: string) => {
    await updateDoneColumn(
      columnId === editorData.doneColumn ? null : columnId
    );
    setLoading(false);
  };

  const handleListClick = async (e: SyntheticEvent) => {
    if (!isSelectModeActive) return;

    const target = e.target as HTMLDivElement;
    const columnItem = target.closest(
      '.settings-column-item'
    ) as HTMLDivElement;
    if (!columnItem) return;

    const columnTitle = columnItem.dataset.value;
    if (!columnTitle) return;

    const column = getColumn({ columnTitle });
    if (!column?.columnId) return;

    setLoading(true);
    setSelectColumnMode(false);

    const isDoneColumn = column.columnId === editorData.doneColumn;

    openModal({
      name: IModal.CONFIRM_MODAL,
      data: {
        title: isDoneColumn ? UNSELECT_COLUMN_TITLE : SELECT_COLUMN_TITLE,
        message: isDoneColumn ? UNSELECT_COLUMN_MESSAGE : SELECT_COLUMN_MESSAGE,
        args: [column.columnId],
        callback: handleDoneColumn,
      },
    });
  };

  const saveButtonHandler = async ({
    fieldValue,
    isBoardCreate,
    isBoardUpdate,
    isColumnCreate,
    isColumnUpdate,
    isShareBoard,
    columnId,
  }: ISaveButtonHandler): Promise<ICustomResponse<string | undefined>> => {
    if (isBoardCreate && setUpdatedData) {
      const response = await createBoard(fieldValue);
      setUpdatedData(fieldValue);

      if (response.payload) {
        setCurrentBoardAction(response.payload);
      }
      return response;
    }
    if (isBoardUpdate && boardId) {
      const response = await updateBoardTitle({ boardId, title: fieldValue });
      setCurrentBoardAction(boardId);
      return response;
    }

    if (isColumnCreate) {
      const response = await createColumnHelper(fieldValue, boardId);
      return response;
    }
    if (isColumnUpdate) {
      const response = await updateColumn({ title: fieldValue, columnId });
      return response;
    }
    if (isShareBoard) {
      const response = shareBoard(boardId, fieldValue);
      return response;
    }

    return { isError: 1, message: 'Unhandled' } as ICustomResponse;
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
          args: [type, boardId],
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
          args: [type, boardId],
          callback: membersCallback,
        };
    }
  };

  const membersCallback = async (
    type: 'leave' | 'kick' | 'delete',
    boardId: string,
    memberEmail?: string
  ) => {
    try {
      const response =
        type === 'delete'
          ? deleteBoard(boardId)
          : await boardMemberApi(type, boardId, memberEmail);
      if (!response) {
        throw response;
      }

      if (type === 'leave' || type === 'delete') {
        setUpdatedData!(null);
        closeEditor();
      }
    } catch (err) {
      return err;
    }
  };

  const onButtonsAction = (type: 'leave' | 'kick' | 'delete'): void => {
    if (type === 'delete' && !setUpdatedData) return;

    const data = getMembersActionData(type, boardId);

    openModal({
      name: IModal.CONFIRM_MODAL,
      data,
    });
  };

  const closeEditMode = () => {
    openEditor({ data: editorData });
  };

  return {
    loading,
    isSelectModeActive,
    onButtonsAction,
    handleListClick,
    toggleSelectMode,
    saveButtonHandler,
    closeEditMode,
  };
};
