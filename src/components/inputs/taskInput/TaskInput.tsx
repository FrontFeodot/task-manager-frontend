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
}: ITaskInput): JSX.Element => {
  const [isEditField, setIsEditField] = useState(true);
  const [fieldValue, setFieldValue] = useState(watch(fieldName) || '');
  const isTitleView = fieldName === 'name';

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
    <S.TaskInputContainer>
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
              autoFocus={!!fieldValue}
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
              autoFocus={!!fieldValue}
            />
          )}
          {/*           <S.ButtonContainer>
            <StyledButton label="Save" />
          </S.ButtonContainer> */}
        </>
      ) : (
        <TitleComponent onClick={() => setIsEditField(true)}>
          {watch(fieldName)}
        </TitleComponent>
      )}
    </S.TaskInputContainer>
  );
};

export default TaskInput;
