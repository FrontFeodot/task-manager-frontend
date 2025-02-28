import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import * as S from './AuthInput.styled';
import { ITextInput } from './AuthInput.types';

const AuthInput = ({
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
      <S.TextInput type={passwordType || type} {...config} {...inputProps} />
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

export default AuthInput;
