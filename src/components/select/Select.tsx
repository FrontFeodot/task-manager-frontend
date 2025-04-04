import { SyntheticEvent, useEffect } from 'react';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import map from 'lodash/map';
import upperFirst from 'lodash/upperFirst';

import { ITaskFormValues } from '@components/task/taskComponent/TaskComponent.types';

import * as S from './Select.styled';
import { ISelect } from './Select.types';

const CustomSelect = ({
  items,
  name,
  label,
  setValue,
  handleChange,
  register,
  selectRef,
  isCreateTask,
  defaultVal,
  ...props
}: ISelect): JSX.Element => {
  const defaultValue =
    defaultVal || (isArray(items) ? items[0] : keys(items)[0]);

  const isParentTask = name === 'parentTask';

  useEffect(() => {
    if (setValue) {
      setValue(name, defaultValue);
    }
  }, []);

  return (
    <S.SelectWrapper>
      {isCreateTask && <S.Label htmlFor={name}>{upperFirst(label)}</S.Label>}
      <S.StyledSelect
        {...props}
        defaultValue={defaultValue}
        {...(register
          ? {
              ...register(name as keyof ITaskFormValues, {
                onChange: (e: SyntheticEvent<HTMLSelectElement>) => {
                  if (handleChange) {
                    return handleChange(e);
                  }
                  if (setValue) {
                    return setValue(name, e.currentTarget.value);
                  }
                },
              }),
            }
          : {
              onChange: handleChange,
            })}
        ref={selectRef}
      >
        {isArray(items)
          ? map(items, (item) => (
              <option key={item} value={item}>
                {upperFirst(item)}
              </option>
            ))
          : map(keys(items), (item) => (
              <option key={item} value={item}>
                {isParentTask && !!+item
                  ? `№${item} | ${items[item].value}`
                  : items[item].value}{' '}
              </option>
            ))}
      </S.StyledSelect>
    </S.SelectWrapper>
  );
};

export default CustomSelect;
