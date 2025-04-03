import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import upperFirst from 'lodash/upperFirst';
import { FaEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

import * as S from './BoardEditorInput.styled';
import { IBoardEditorInput } from './BoardEditorInput.types';
import { IBoardFormValues } from '@common/interfaces/IBoard';
import { isEmpty } from 'lodash';
import StyledButton from '@components/styledButton/StyledButton';
import { useTheme } from 'styled-components';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';
import { deleteColumnHelper } from '@common/helpers/columnHelper';

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

  const isColumnUpdate = /\d/.test(fieldName);
  const isColumnCreate = fieldName === 'column_create';

  const [isEdit, setIsEdit] = useState<boolean | null>(isBoardCreate);

  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const hasCancelButton = !isBoardCreate;

  useEffect(() => {
    if (currentValue) {
      setFieldValue(currentValue);
    }
  }, [currentValue]);

  useEffect(() => {
    if (autofocus) {
      handleCreateColumn();
    }
  }, [autofocus]);

  const handleCreateColumn = () => {
    if (isColumnCreate) {
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
    }
  };

  return (
    <S.EditorInputWrapper>
      {isEdit ? (
        <S.EditSectionWrapper>
          <S.StyledInput
            ref={inputRef}
            name={fieldName}
            value={fieldValue}
            onChange={onChangeHandler}
            autoFocus
          />
          <S.ButtonContainer $hasCancelButton={hasCancelButton}>
            <StyledButton
              onClick={onSubmit}
              label="Save"
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
          {error ? <S.ErrorContainer>{error}</S.ErrorContainer> : null}
        </S.EditSectionWrapper>
      ) : (
        <S.PresentationWrapper
          $isColumn={isColumnCreate || isColumnUpdate}
          $isColumnCreate={isColumnCreate}
          onClick={handleCreateColumn}
        >
          <S.TitleValue>
            {isColumnCreate ? (
              <FaPlus size={18} fill={theme.textPrimary} />
            ) : (
              fieldValue
            )}
          </S.TitleValue>
          {isColumnUpdate || isBoardUpdate ? (
            <S.PresentationButtons>
              <S.PresentationButtonWrapper>
                <FaEdit
                  fill={theme.textPrimary}
                  size={16}
                  onClick={() => setIsEdit(true)}
                />
              </S.PresentationButtonWrapper>
              {isColumnUpdate ? (
                <S.PresentationButtonWrapper $isRedButton onClick={onDelete}>
                  {' '}
                  <FaRegTrashAlt size={16} fill={theme.textPrimary} />{' '}
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
