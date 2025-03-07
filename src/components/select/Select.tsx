import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import map from 'lodash/map';
import upperFirst from 'lodash/upperFirst';

import * as S from './Select.styled';
import { ISelect } from './Select.types';
import { ITask } from '@common/interfaces/ITask';
import { SyntheticEvent, useEffect } from 'react';

const CustomSelect = ({
  items,
  name,
  label,
  setValue,
  handleChange,
  register,
  watch,
  selectRef,
  isCreateTask,
  defaultVal,
}: ISelect): JSX.Element => {
  const defaultValue =
    defaultVal || (isArray(items) ? items[0] : keys(items)[0]);

  const isParentTask = name === 'parentTask';

  useEffect(() => {
    if (setValue) {
      setValue(name, defaultValue);
      console.log('setValue');
    }
  }, []);

  return (
    <div>
      {isCreateTask && <S.Label htmlFor={name}>{upperFirst(label)}</S.Label>}
      <S.StyledSelect
        defaultValue={defaultValue}
        {...register(name as keyof Partial<ITask>, {
          onChange: (e: SyntheticEvent<HTMLSelectElement>) => {
            if (handleChange) {
              return handleChange(e);
            }
            if (setValue) {
              return setValue(name, e.currentTarget.value);
            }
          },
        })}
        ref={selectRef}
      >
        {isArray(items)
          ? map(items, (item, i) => {
              return (
                <option key={item} value={item}>
                  {upperFirst(item)}
                </option>
              );
            })
          : map(keys(items), (item) => {
              const { Icon } = items[item];
              return (
                <option key={item} value={item}>
                  {isParentTask && !!+item
                    ? `№${item} | ${items[item].value}`
                    : items[item].value}{' '}
                  {Icon ? <Icon size={20} color="red" /> : null}
                </option>
              );
            })}
      </S.StyledSelect>
    </div>
  );
};

export default CustomSelect;
