import { IStorySelect } from './TaskFormSelect.types';
import * as S from './TaskFormSelect.styled';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import CustomSelect from '../Select';
import { getStorySchema } from '@common/utils/tasdDetailsConfig';
import useOutsideClick from '@common/hooks/useOutSideClick';
import { upperFirst } from 'lodash';

const TaskFormSelect = ({
  name,
  label,
  items,
  title,
  defaultVal,
  register,
  setValue,
}: IStorySelect): JSX.Element => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isEditField, setIsEditField] = useState(false);
  //const [fieldValue, setFieldValue] = useState(title);
  const handleTitleClick = (event: SyntheticEvent) => {
    if (isEditField) {
      event.preventDefault();
      event.stopPropagation();
      return null;
    }
    setIsEditField(true);
  };
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current?.focus();
    }
  }, [isEditField]);

  const handleOutsideClick = () => {
    setIsEditField(false);
  };

  const handleChange = () => {
    const selectValue = selectRef.current?.value;
    setValue(name, selectValue);
  };

  useOutsideClick(wrapperRef, handleOutsideClick);

  return (
    <S.TaskFormSelectWrapper
      $isEditField={isEditField}
      ref={wrapperRef}
      onClick={handleTitleClick}
    >
      <S.TaskFormSelectLabel>{`${upperFirst(label)}:`}</S.TaskFormSelectLabel>
      {isEditField ? (
        <CustomSelect
          name={name}
          label={label}
          items={items}
          register={register}
          selectRef={selectRef}
          defaultVal={defaultVal}
          handleChange={handleChange}
        />
      ) : (
        <S.TaskFormSelectValue>{title}</S.TaskFormSelectValue>
      )}
    </S.TaskFormSelectWrapper>
  );
};

export default TaskFormSelect;
