import { RiCloseLargeLine } from 'react-icons/ri';

import { IBoardEditor, ISaveButtonHandler } from './BoardEditor.types';
import * as S from './BoardEditor.styled';
import { useTheme } from 'styled-components';
import { IBoard, IColumn } from '@common/providers/boardProvider/types';
import { useForm } from 'react-hook-form';
import TaskInput from '@components/inputs/taskInput/TaskInput';
import { map } from 'lodash';
import { IBoardFormValues } from '@common/interfaces/IBoard';
import BoardEditorInput from '@components/inputs/boardEditorInput/BoardEditorInput';
import { Dispatch, useState } from 'react';
import { createColumnHelper } from '@common/helpers/columnHelper';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { updateColumn } from '@common/api/columnApi';
import {
  createBoard,
  deleteBoard,
  updateBoardTitle,
} from '@common/api/boardApi';
import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import { DATE_UP_TO_MINUTES } from '@common/utils/dateFormats';
import { formatDate } from '@common/helpers/dateHelper';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';
import { setCurrentBoardAction } from '@common/helpers/boardHelper';
import { closeEditor } from '@common/providers/boardProvider/useBoardState';

const BoardEditor = ({ board, setUpdatedData }: IBoardEditor): JSX.Element => {
  const theme = useTheme();
  const isCreate = !board?.boardId;
  const { title, columns, createdAt, boardId } = board;

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
      console.log('isBoardCreate', response);
      return response;
    }
    if (isBoardUpdate && boardId) {
      const response = await updateBoardTitle({ boardId, title: fieldValue });
      console.log('isBoardUpdate', response);
      return response;
    }

    if (isColumnCreate) {
      const response = await createColumnHelper(fieldValue, boardId);
      console.log('isColumnCreate', response);
      return response;
    }
    if (isColumnUpdate) {
      const response = await updateColumn({ title: fieldValue, columnId });
      console.log('isColumnUpdate', response);
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
      console.error(err);
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
  return (
    <S.BoardEditorWrapper>
      <S.CloseEditorWrapper onClick={closeEditor}>
        <RiCloseLargeLine size={18} fill={theme.textPrimary} />
      </S.CloseEditorWrapper>
      <S.BoardEditorFieldsList>
        <S.TitleWrapper>
          <S.FieldLabel $isTitle>Title</S.FieldLabel>
          <BoardEditorInput
            saveButtonHandler={saveButtonHandler}
            fieldName={`title_${isCreate ? 'create' : 'update'}`}
            currentValue={title}
            isCreate={isCreate}
          />
        </S.TitleWrapper>
        <S.ColumnList>
          <S.FieldLabel>Columns</S.FieldLabel>

          {columns?.length
            ? map(columns, ({ title, columnId }, index) => {
                return (
                  <BoardEditorInput
                    saveButtonHandler={saveButtonHandler}
                    isColumn
                    fieldName={`column_${index + 1}`}
                    currentValue={title}
                    key={index}
                    columnId={columnId}
                    boardId={boardId}
                  />
                );
              })
            : null}
          <BoardEditorInput
            saveButtonHandler={saveButtonHandler}
            isColumn
            isCreate
            fieldName="column_create"
            boardId={boardId}
          />
        </S.ColumnList>
      </S.BoardEditorFieldsList>
      {createdAt ? (
        <S.CreatedAtBoard>{`Created at: ${formatDate(createdAt, DATE_UP_TO_MINUTES)}`}</S.CreatedAtBoard>
      ) : null}
      <S.DeleteBoardButton>
        <StyledButton
          label="Delete board"
          buttonColor={IButtonColor.RED}
          onClick={onBoardDelete}
        />
      </S.DeleteBoardButton>
    </S.BoardEditorWrapper>
  );
};

export default BoardEditor;
