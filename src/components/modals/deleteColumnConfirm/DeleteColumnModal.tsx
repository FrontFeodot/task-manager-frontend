import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import findIndex from 'lodash/findIndex';
import map from 'lodash/map';

import { TextInline } from '@components/text/TextCommon.styled';
import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import CustomSelect from '@components/select/Select';

import useOutsideClick from '@common/hooks/useOutSideClick';
import {
  closeModal,
  useAppState,
} from '@common/providers/appProvider/useAppState';

import { getBoardById } from '@common/helpers/boardHelper';
import { IBoard } from '@common/providers/boardProvider/types';
import { deleteColumnHelper, getColumn } from '@common/helpers/columnHelper';
import { getBoards } from '@common/api/boardApi';

import * as S from './DeleteColumnModal.styled';

const DeleteColumnModal = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
  const ref = useRef(null);
  const moveToRef = useRef<HTMLInputElement | null>(null);

  const currentModal = useAppState((s) => s.currentModal);

  const columnId = currentModal?.data?.columnId as string;
  const boardId = currentModal?.data?.boardId as string;
  const { columns } = getBoardById(boardId) as IBoard;
  const removedColumn = findIndex(
    columns,
    (column) => column.columnId === columnId
  );

  const restColumns = [...columns];
  restColumns.splice(removedColumn, 1);

  const restColumnsTitles = map(restColumns, (column) => column.title);

  useEffect(() => {
    setInputValue('delete');
    setSelectValue(restColumnsTitles[0]);
  }, []);

  useOutsideClick(ref, closeModal);

  const handleRadioChange = (e: SyntheticEvent<HTMLInputElement>): void => {
    if (e.currentTarget.id) {
      setInputValue(e.currentTarget.id);
    }
  };
  const handleSelectChange = (value?: string | number): void => {
    if (value) {
      setSelectValue(value as string);
    }
  };

  const handleSelectClick = () => {
    if (inputValue === 'delete') {
      setInputValue('moveTo');
    }
  };

  const handleSubmit = async () => {
    if (!!inputValue) {
      const isDelete = inputValue === 'delete';
      const selectedColumnId =
        getColumn({ columnTitle: selectValue })?.columnId || inputValue;
      const tasksPath = isDelete ? inputValue : selectedColumnId;
      try {
        const response = await deleteColumnHelper({
          columnId,
          boardId,
          tasksPath,
        });
        if (!response || (response && response.isError)) {
          throw response;
        }
        getBoards();
        closeModal();
      } catch (err) {
        return err;
      }
    }
  };

  const handleClose = (): void => closeModal();

  return (
    <S.ModalWrapper ref={ref}>
      <S.ModalLabel>What do we do with the tasks in this column?</S.ModalLabel>
      <S.ModalContent>
        {restColumnsTitles.length ? (
          <S.RadioWrapper>
            <S.HiddenRadio
              name="tasksPath"
              id="moveTo"
              onChange={handleRadioChange}
              ref={moveToRef}
              checked={inputValue !== 'delete'}
            />
            <S.RadioButtonLabel
              htmlFor="moveTo"
              onMouseDown={handleSelectClick}
            >
              <S.StyledRadio />
              <S.RadioLabelContent>
                <TextInline>Move to another column:</TextInline>
                <CustomSelect
                  label="columns"
                  name="column"
                  items={restColumnsTitles}
                  handleChange={handleSelectChange}
                  defaultVal={restColumnsTitles[0]}
                />
              </S.RadioLabelContent>
            </S.RadioButtonLabel>
          </S.RadioWrapper>
        ) : null}
        <S.RadioWrapper>
          <S.HiddenRadio
            name="tasksPath"
            id="delete"
            onChange={handleRadioChange}
            checked={inputValue === 'delete' || !restColumnsTitles.length}
          />
          <S.RadioButtonLabel htmlFor="delete">
            <S.StyledRadio />
            <S.RadioLabelContent>
              <TextInline>Delete all tasks in column</TextInline>
            </S.RadioLabelContent>
          </S.RadioButtonLabel>
        </S.RadioWrapper>
      </S.ModalContent>
      <S.ModalButtons>
        <S.ButtonWrapper>
          <StyledButton
            label="confirm"
            onClick={handleSubmit}
            buttonColor={IButtonColor.GREEN}
          />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <StyledButton
            label="cancel"
            onClick={handleClose}
            buttonColor={IButtonColor.RED}
          />
        </S.ButtonWrapper>
      </S.ModalButtons>
    </S.ModalWrapper>
  );
};

export default DeleteColumnModal;
