import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { ISaveButtonHandler, IUseBoardHandlers } from './BoardEditor.types';
import {
  createBoard,
  deleteBoard,
  updateBoardTitle,
  updateDoneColumn,
} from '@common/api/boardApi';
import { setCurrentBoardAction } from '@common/helpers/boardHelper';
import { createColumnHelper, getColumn } from '@common/helpers/columnHelper';
import { updateColumn } from '@common/api/columnApi';
import { Dispatch, useState } from 'react';
import {
  closeEditor,
  openEditor,
} from '@common/providers/boardProvider/useBoardState';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';
import { SyntheticEvent } from 'react-draft-wysiwyg';

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

    await updateDoneColumn(
      column.columnId === editorData.doneColumn ? null : column.columnId
    );
    setLoading(false);
  };

  const saveButtonHandler = async ({
    fieldValue,
    isBoardCreate,
    isBoardUpdate,
    isColumnCreate,
    isColumnUpdate,
    columnId,
  }: ISaveButtonHandler): Promise<ICustomResponse> => {
    if (isBoardCreate && setUpdatedData) {
      const response = await createBoard(fieldValue);
      setUpdatedData(fieldValue);
      setCurrentBoardAction(fieldValue);
      return response;
    }
    if (isBoardUpdate && boardId) {
      const response = await updateBoardTitle({ boardId, title: fieldValue });
      setCurrentBoardAction(fieldValue);
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

    return { isError: 1, message: 'Unhandled' } as ICustomResponse;
  };

  const deleteBoardCallback = async (
    boardId: string,
    setUpdatedData: Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      const response = await deleteBoard(boardId);
      if (response.isError) {
        throw response;
      }
      if (setUpdatedData) {
        setUpdatedData(null);
      }
      closeEditor();
    } catch (err) {
      return err;
    }
  };

  const onBoardDelete = () => {
    if (!setUpdatedData) return;

    openModal({
      name: IModal.CONFIRM_MODAL,
      data: {
        title: 'Delete the board?',
        message: 'Tasks and columns from this board will be removed too',
        args: [boardId, setUpdatedData],
        callback: deleteBoardCallback,
      },
    });
  };

  const closeEditMode = () => {
    openEditor({ data: editorData });
  };

  return {
    loading,
    isSelectModeActive,
    handleListClick,
    toggleSelectMode,
    saveButtonHandler,
    onBoardDelete,
    closeEditMode,
  };
};
