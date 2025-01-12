import React from 'react';

import * as S from './TextInput.styled';
import { ITextInput } from './TextInput.types';

const TextInput = ({
  value,
  onChange,
  type = 'text',
  config,
  ...inputProps
}: ITextInput): JSX.Element => {
  return (
    <S.Wrapper>
      <S.TextInput
        value={value}
        onChange={onChange}
        type={type}
        {...config}
        {...inputProps}
      />
    </S.Wrapper>
  );
};

export default TextInput;
