import { useRef, useState } from 'react';
import upperFirst from 'lodash/upperFirst';

import useOutsideClick from '@common/hooks/useOutSideClick';

import * as S from './TaskInput.styled';
import { ITaskInput } from './TaskInput.types';

const TaskInput = ({
  fieldName,
  watch,
  register,
  setValue,
  isCreateTask,
}: ITaskInput): JSX.Element => {
  const [isEditField, setIsEditField] = useState(isCreateTask);
  const [fieldValue, setFieldValue] = useState(watch(fieldName) || '');
  const isTitleView = fieldName === 'title';

  const TitleComponent = isTitleView ? S.TitleValue : S.DescriptionValue;
  const inputRef = useRef(null);

  const toggleInput = () => {
    if (fieldValue) {
      setIsEditField(false);
      setValue(fieldName, fieldValue);
    }
  };

  useOutsideClick<HTMLInputElement>(inputRef, toggleInput);

  return (
    <S.TaskInputContainer isTitleView={isTitleView}>
      <S.Label>{upperFirst(fieldName)}</S.Label>
      {isEditField ? (
        <>
          {isTitleView ? (
            <S.StyledInput
              value={fieldValue}
              {...register(fieldName, {
                required: 'Title is required',
                onChange: (e: any) => {
                  setFieldValue(e.target.value);
                },
              })}
              ref={inputRef}
              autoFocus={isEditField && !!fieldValue}
            />
          ) : (
            <S.StyledTextArea
              value={fieldValue}
              {...register(fieldName, {
                onChange: (e: any) => {
                  setFieldValue(e.target.value);
                },
              })}
              ref={inputRef}
              autoFocus={isEditField && !!fieldValue}
            />
          )}
          {/*           <S.ButtonContainer>
            <StyledButton label="Save" />
          </S.ButtonContainer> */}
        </>
      ) : (
        <TitleComponent
          className={isTitleView ? 'input-title' : ''}
          onClick={() => setIsEditField(true)}
        >
          {watch(fieldName)}
        </TitleComponent>
      )}
    </S.TaskInputContainer>
  );
};

export default TaskInput;
