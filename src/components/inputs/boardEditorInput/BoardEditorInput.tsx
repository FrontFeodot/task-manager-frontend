import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';

import { deleteColumnHelper } from '@common/helpers/columnHelper';
import Icon from '@common/icons/Icon';

import { IBoardEditorInput } from './BoardEditorInput.types';
import * as S from './BoardEditorInput.styled';

const BoardEditorInput = ({
  fieldName,
  currentValue,
  saveButtonHandler,
  columnId,
  boardId,
  autofocus,
  closeEditMode,
}: IBoardEditorInput): JSX.Element => {
  const [fieldValue, setFieldValue] = useState(currentValue);
  const isBoardCreate = fieldName === 'title_create';
  const isBoardUpdate = fieldName === 'title_update';
  const isShareBoard = fieldName === 'share_board';

  const isColumnUpdate = /\d/.test(fieldName);
  const isColumnCreate = fieldName === 'column_create';

  const [isEdit, setIsEdit] = useState<boolean | null>(isBoardCreate);

  const [error, setError] = useState<string | null>(null);
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
      setIsEdit(true);
      setFieldValue('');
    }
  };

  const onChangeHandler = (e: SyntheticEvent<HTMLInputElement>): void => {
    if (!!error) {
      setError(null);
    }
    setFieldValue(e.currentTarget.value);
  };

  const onCancelHandler = () => {
    setFieldValue(currentValue);
    setIsEdit(false);
    closeEditMode();
  };

  const onSubmit = async (): Promise<void> => {
    if (!fieldValue) {
      return setError('Field is empty');
    }
    const response = await saveButtonHandler({
      fieldValue,
      isBoardCreate,
      isBoardUpdate,
      isColumnCreate,
      isColumnUpdate,
      isShareBoard,
      columnId,
    });

    if (response.isError) {
      return setError(response.message);
    }
    closeEditMode();
    setIsEdit(false);
  };

  const onDelete = async (): Promise<void> => {
    if (columnId && boardId) {
      const response = await deleteColumnHelper({ columnId, boardId });
      if (response && response.isError) {
        setError(response.message);
      }
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
            ref={inputRef}
            name={fieldName}
            value={fieldValue}
            onChange={onChangeHandler}
            autoFocus
          />
          {error ? <S.ErrorContainer>{error}</S.ErrorContainer> : null}

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
        </S.EditSectionWrapper>
      ) : (
        <S.PresentationWrapper
          className="settings-column-item"
          data-value={fieldValue}
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
                <Icon name="edit" size={16} onClick={() => setIsEdit(true)} />
              </S.PresentationButtonWrapper>
              {isColumnUpdate ? (
                <S.PresentationButtonWrapper $isRedButton onClick={onDelete}>
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
