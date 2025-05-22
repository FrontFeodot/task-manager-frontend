import { useRef } from 'react';
import upperFirst from 'lodash/upperFirst';

import * as S from './TaskFormSelect.styled';
import { IStorySelect } from './TaskFormSelect.types';
import CustomSelect from '../Select';

const TaskFormSelect = ({
  name,
  label,
  items,
  defaultVal,
  setValue,
}: IStorySelect): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const firstItem = Array.isArray(items) ? items[0] : Object.keys(items)[0];

  return (
    <S.TaskFormSelectWrapper ref={wrapperRef}>
      <S.TaskFormSelectLabel>{`${upperFirst(label)}:`}</S.TaskFormSelectLabel>
      <CustomSelect
        name={name}
        label={label}
        items={items}
        selectRef={selectRef}
        defaultVal={defaultVal ?? firstItem}
        setValue={setValue}
      />
    </S.TaskFormSelectWrapper>
  );
};

export default TaskFormSelect;
