import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import map from 'lodash/map';
import upperFirst from 'lodash/upperFirst';

import * as S from './Select.styled';
import { ISelect } from './Select.types';
import { ITask } from '@common/interfaces/ITask';

const CustomSelect = ({
  items,
  name,
  setValue,
  register,
  watch,
}: ISelect): JSX.Element => {
  const defaultValue = isArray(items) ? items[0] : keys(items)[0];
  const isParentTask = name === 'parentTask';
  return (
    <div>
      <S.Label htmlFor={name}>{upperFirst(name)}</S.Label>
      <S.StyledSelect
        defaultValue={defaultValue}
        {...register(name as keyof Partial<ITask>)}
      >
        {isArray(items)
          ? map(items, (item, i) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })
          : map(keys(items), (item) => {
              return (
                <option key={item} value={isParentTask ? +item : item}>
                  {isParentTask && !!+item
                    ? `№${item} | ${items[item]}`
                    : items[item]}
                </option>
              );
            })}
      </S.StyledSelect>
    </div>
  );
};

export default CustomSelect;
