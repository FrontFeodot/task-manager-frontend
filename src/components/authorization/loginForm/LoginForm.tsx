import { useState } from 'react';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';

import AuthInput from '@components/inputs/authInput/AuthInput';
import StyledButton from '@components/styledButton/StyledButton';

import { setLoginUser } from '@common/providers/userProvider/useUserState';
import { postLogin } from '@common/api/auth';
import { IPostLogin } from '@common/interfaces/IAuth';

import { ErrorTooltip, Form, Item, Label } from '../Authorization.styled';
import * as S from './LoginForm.styled';

const LoginForm = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IPostLogin>({
    mode: 'onChange',
  });

  const emailConfig = register('email', {
    required: 'Email is required',
    onChange: () => {
      clearErrors();
    },
  });

  const passwordConfig = register('password', {
    required: 'Password is required',
    onChange: () => {
      clearErrors();
    },
  });

  const onSubmit = async (data: IPostLogin) => {
    setError(null);
    const response = await postLogin(data);
    if (response?.isError) {
      return setError(response.message);
    }
    setLoginUser(true);
  };

  return (
    <S.Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Item>
          <Label>Enter your E-Mail</Label>
          <AuthInput config={emailConfig} type="email" />
          {errors.email && (
            <ErrorTooltip>{`${get(errors, 'email.message')}`}</ErrorTooltip>
          )}
        </Item>
        <Item>
          <Label>Enter your password</Label>
          <AuthInput config={passwordConfig} type="password" />
          {errors.password && (
            <ErrorTooltip>{`${get(errors, 'password.message')}`}</ErrorTooltip>
          )}
        </Item>
        <Item>
          <StyledButton label="sign in" type="submit" />
        </Item>
        {error && <ErrorTooltip $isGlobal>{error}</ErrorTooltip>}
      </Form>
    </S.Wrapper>
  );
};

export default LoginForm;
