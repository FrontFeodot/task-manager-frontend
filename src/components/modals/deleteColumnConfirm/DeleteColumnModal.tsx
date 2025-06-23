import findIndex from 'lodash/findIndex';
import map from 'lodash/map';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { getCurrentModal } from '@common/helpers/appHelper';
import { getBoardById } from '@common/helpers/boardHelper';
import { deleteColumnHelper, getColumn } from '@common/helpers/columnHelper';
import useOutsideClick from '@common/hooks/useOutSideClick';
import { IModal } from '@common/providers/appProvider/types';
import { closeModal } from '@common/providers/appProvider/useAppState';
import { IBoard } from '@common/providers/boardProvider/types';

import CustomSelect from '@components/select/Select';
import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import { TextInline } from '@components/text/TextCommon.styled';

import * as S from './DeleteColumnModal.styled';

const DeleteColumnModal = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
  const ref = useRef(null);
  const moveToRef = useRef<HTMLInputElement | null>(null);

  const currentModal = getCurrentModal(IModal.DELETE_COLUMN_CONFIRM);

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

  const handleClose = (): void => closeModal(IModal.DELETE_COLUMN_CONFIRM);

  useOutsideClick(ref, handleClose);

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
      deleteColumnHelper({
        columnId,
        boardId,
        tasksPath,
      });

      handleClose();
    }
  };

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
