import map from 'lodash/map';
import { Dispatch } from 'react';

import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import BoardEditorInput from '@components/inputs/boardEditorInput/BoardEditorInput';

import { createColumnHelper } from '@common/helpers/columnHelper';
import { ICustomResponse } from '@common/interfaces/IApiHandler';
import { updateColumn } from '@common/api/columnApi';
import {
  createBoard,
  deleteBoard,
  updateBoardTitle,
} from '@common/api/boardApi';
import { DATE_UP_TO_MINUTES } from '@common/utils/dateFormats';
import { formatDate } from '@common/helpers/dateHelper';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';
import { setCurrentBoardAction } from '@common/helpers/boardHelper';
import {
  closeEditor,
  openEditor,
} from '@common/providers/boardProvider/useBoardState';

import * as S from './BoardEditor.styled';
import { IBoardEditor, ISaveButtonHandler } from './BoardEditor.types';

const BoardEditor = ({
  editorData,
  newField,
  setUpdatedData,
}: IBoardEditor): JSX.Element => {
  const { title, columns, createdAt, boardId } = editorData;

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

  const closeEditMode = () => {
    openEditor({ data: editorData });
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
  return (
    <S.BoardEditorWrapper>
      <S.BoardEditorFieldsList>
        <S.TitleWrapper>
          <S.FieldLabel $isTitle>Title</S.FieldLabel>
          <BoardEditorInput
            saveButtonHandler={saveButtonHandler}
            fieldName={`title_${newField === 'board' ? 'create' : 'update'}`}
            currentValue={title}
            closeEditMode={closeEditMode}
          />
        </S.TitleWrapper>

        {!!title ? (
          <S.ColumnList>
            <S.FieldLabel>Columns</S.FieldLabel>
            {columns?.length
              ? map(columns, ({ title, columnId }, index) => {
                  return (
                    <BoardEditorInput
                      saveButtonHandler={saveButtonHandler}
                      fieldName={`column_${index + 1}`}
                      currentValue={title}
                      key={index}
                      columnId={columnId}
                      boardId={boardId}
                      closeEditMode={closeEditMode}
                    />
                  );
                })
              : null}
            <BoardEditorInput
              saveButtonHandler={saveButtonHandler}
              fieldName="column_create"
              boardId={boardId}
              autofocus={newField === 'column'}
              closeEditMode={closeEditMode}
            />
          </S.ColumnList>
        ) : null}
      </S.BoardEditorFieldsList>
      {createdAt ? (
        <S.CreatedAtBoard>{`Created at: ${formatDate(createdAt, DATE_UP_TO_MINUTES)}`}</S.CreatedAtBoard>
      ) : null}
      {newField !== 'board' ? (
        <S.DeleteBoardButton>
          <StyledButton
            label="Delete board"
            buttonColor={IButtonColor.RED}
            onClick={onBoardDelete}
          />
        </S.DeleteBoardButton>
      ) : null}
    </S.BoardEditorWrapper>
  );
};

export default BoardEditor;
