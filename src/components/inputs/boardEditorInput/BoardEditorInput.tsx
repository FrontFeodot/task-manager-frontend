import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { manageColumnEvent } from '@common/api/socket/socket';
import { onEditorInputSubmit } from '@common/helpers/boardEditorHelper';
import Icon from '@common/icons/Icon';
import { setBoardEditorResult } from '@common/providers/boardProvider/useBoardState';

import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';

import * as S from './BoardEditorInput.styled';
import { IBoardEditorInput } from './BoardEditorInput.types';

const BoardEditorInput = ({
  fieldName,
  currentValue,
  columnId,
  boardId,
  autofocus,
  result,
  editableField,
  setEditableField,
}: IBoardEditorInput): JSX.Element => {
  const [fieldValue, setFieldValue] = useState(currentValue);
  const isBoardCreate = fieldName === 'title_create';
  const isBoardUpdate = fieldName === 'title_update';
  const isShareBoard = fieldName === 'share_board';
  const isColumnCreate = fieldName === 'column_create';
  const isColumnUpdate = /\d/.test(fieldName);

  const isEdit = editableField === fieldName;

  const inputRef = useRef<HTMLInputElement>(null);

  const hasCancelButton = !isBoardCreate;

  useEffect(() => {
    if (currentValue) {
      setFieldValue(currentValue);
    }
  }, [currentValue]);

  useEffect(() => {
    if (autofocus) {
      handleEditMode();
    }
  }, [autofocus]);

  const handleEditMode = () => {
    if (isColumnCreate || isShareBoard) {
      setEditableField(fieldName);
      setFieldValue('');
    }
    if (result) {
      setBoardEditorResult(null);
    }
  };

  const onChangeHandler = (e: SyntheticEvent<HTMLInputElement>): void => {
    if (result) {
      setBoardEditorResult(null);
    }
    setFieldValue(e.currentTarget.value);
  };

  const onCancelHandler = () => {
    setFieldValue(currentValue);
    setEditableField(null);
    if (!!result) {
      setBoardEditorResult(null);
    }
  };

  const onSubmit = async (): Promise<void> => {
    if (!fieldValue) {
      return setBoardEditorResult({
        isError: 1,
        isSuccess: 0,
        message: 'Field is empty',
      });
    }
    if (isColumnCreate) {
      setEditableField(null);
    }

    onEditorInputSubmit({
      fieldValue,
      isBoardCreate,
      isBoardUpdate,
      isColumnCreate,
      isColumnUpdate,
      isShareBoard,
      columnId,
      boardId,
    });
  };

  const onColumnDelete = async (): Promise<void> => {
    if (columnId && boardId) {
      manageColumnEvent({ columnId, boardId, isDelete: true });
    }
  };

  return (
    <S.EditorInputWrapper>
      {isEdit ? (
        <S.EditSectionWrapper>
          {isShareBoard ? (
            <S.ShareBoardTitle>
              Enter the email address of the invited user
            </S.ShareBoardTitle>
          ) : null}
          <S.StyledInput
            disabled={!!result?.isSuccess}
            ref={inputRef}
            name={fieldName}
            value={fieldValue}
            onChange={onChangeHandler}
            autoFocus
          />

          {!result ? (
            <S.ButtonContainer $hasCancelButton={hasCancelButton}>
              <StyledButton
                onClick={onSubmit}
                label={isShareBoard ? 'Send' : 'Save'}
                buttonColor={IButtonColor.GREEN}
              />
              {hasCancelButton ? (
                <StyledButton
                  label="Cancel"
                  buttonColor={IButtonColor.RED}
                  onClick={onCancelHandler}
                />
              ) : null}
            </S.ButtonContainer>
          ) : null}
        </S.EditSectionWrapper>
      ) : (
        <S.PresentationWrapper
          className={isColumnCreate ? '' : 'settings-column-item'}
          data-value={fieldValue?.replace(/ /g, '_')}
          $isColumn={isColumnCreate || isColumnUpdate}
          $isColumnCreate={isColumnCreate}
          onClick={handleEditMode}
        >
          {isShareBoard ? (
            <S.ShareBoardButton>
              <StyledButton label="Share board" />
            </S.ShareBoardButton>
          ) : (
            <S.TitleValue>
              {isColumnCreate ? <Icon name="plus" size={18} /> : fieldValue}
            </S.TitleValue>
          )}
          {isColumnUpdate || isBoardUpdate ? (
            <S.PresentationButtons>
              <S.PresentationButtonWrapper>
                <Icon
                  name="edit"
                  size={16}
                  onClick={() => setEditableField(fieldName)}
                />
              </S.PresentationButtonWrapper>
              {isColumnUpdate ? (
                <S.PresentationButtonWrapper
                  $isRedButton
                  onClick={onColumnDelete}
                >
                  <Icon name="trash" size={20} />
                </S.PresentationButtonWrapper>
              ) : null}
            </S.PresentationButtons>
          ) : null}
        </S.PresentationWrapper>
      )}
    </S.EditorInputWrapper>
  );
};

export default BoardEditorInput;
