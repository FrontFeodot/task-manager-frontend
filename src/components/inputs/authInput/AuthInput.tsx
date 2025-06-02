import { useState } from 'react';

import Icon from '@common/icons/Icon';

import * as S from './AuthInput.styled';
import { ITextInput } from './AuthInput.types';

const AuthInput = ({
  type = 'text',
  config,
  ...inputProps
}: ITextInput): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const passwordType = showPassword ? 'text' : 'password';

  return (
    <S.Wrapper>
      <S.TextInput
        type={type === 'password' ? passwordType : type}
        {...config}
        {...inputProps}
      />
      {type === 'password' && (
        <S.ToggleIcon onClick={togglePassword}>
          <Icon name={`eye-${showPassword ? 'closed' : 'open'}`} size={24} />
        </S.ToggleIcon>
      )}
    </S.Wrapper>
  );
};

export default AuthInput;
