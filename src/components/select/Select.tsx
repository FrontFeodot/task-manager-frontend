import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import map from 'lodash/map';
import upperFirst from 'lodash/upperFirst';
import { useEffect, useRef, useState } from 'react';

import useOutsideClick from '@common/hooks/useOutSideClick';

import * as S from './Select.styled';
import { ISelect } from './Select.types';

const CustomSelect = ({
  items,
  name,
  label,
  setValue,
  handleChange,
  selectRef,
  isCreateTask,
  defaultVal,
  ...props
}: ISelect): JSX.Element => {
  const initialValue =
    name === 'parentTask'
      ? Number(defaultVal || (isArray(items) ? items[0] : keys(items)[0]))
      : defaultVal || (isArray(items) ? items[0] : keys(items)[0]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (setValue) {
      setValue(name, selectedValue);
    }
  }, [selectedValue]);

  const handleOptionClick = (value: string | number): void => {
    setSelectedValue(value);
    setIsOpen(false);

    if (selectedValue === initialValue) return;

    if (handleChange) {
      handleChange(value);
    }

    if (setValue) {
      setValue(name, value || undefined);
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useOutsideClick(wrapperRef, toggleDropdown);

  return (
    <S.SelectWrapper $isCreateTask={isCreateTask}>
      {isCreateTask && <S.Label htmlFor={name}>{upperFirst(label)}</S.Label>}
      <S.StyledSelectWrapper
        {...props}
        $isCreateTask={isCreateTask}
        ref={selectRef}
      >
        <S.SelectedOption onClick={toggleDropdown}>
          {isArray(items)
            ? upperFirst(String(selectedValue))
            : items[selectedValue]?.value || upperFirst(String(selectedValue))}
        </S.SelectedOption>
        {isOpen && (
          <S.OptionsContainer ref={wrapperRef}>
            {isArray(items)
              ? map(items, (item) => (
                  <S.Option key={item} onClick={() => handleOptionClick(item)}>
                    {upperFirst(item)}
                  </S.Option>
                ))
              : map(keys(items), (item) => (
                  <S.Option
                    key={item}
                    onClick={() =>
                      handleOptionClick(
                        name === 'parentTask' ? Number(item) : item
                      )
                    }
                  >
                    {items[item].value}
                  </S.Option>
                ))}
          </S.OptionsContainer>
        )}
      </S.StyledSelectWrapper>
    </S.SelectWrapper>
  );
};

export default CustomSelect;
