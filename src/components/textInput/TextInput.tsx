import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Используем библиотеку react-icons

import * as S from './TextInput.styled';
import { ITextInput } from './TextInput.types';

const TextInput = ({
  value,
  onChange,
  type = 'text',
  config,
  ...inputProps
}: ITextInput): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const passwordType = isPassword && (showPassword ? 'text' : 'password');

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <S.Wrapper>
      <S.TextInput
        value={value}
        onChange={onChange}
        type={passwordType || type}
        {...config}
        {...inputProps}
      />
      {isPassword && (
        <S.ToggleIcon onClick={togglePassword}>
          {showPassword ? (
            <AiOutlineEyeInvisible size={24} />
          ) : (
            <AiOutlineEye size={24} />
          )}
        </S.ToggleIcon>
      )}
    </S.Wrapper>
  );
};

export default TextInput;
