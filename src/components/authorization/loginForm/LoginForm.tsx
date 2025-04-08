import { useState } from 'react';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';

import AuthInput from '@components/inputs/authInput/AuthInput';
import StyledButton from '@components/styledButton/StyledButton';

import { setLoginUser } from '@common/providers/userProvider/useUserState';
import { postLogin } from '@common/api/auth';
import { IPostLogin } from '@common/interfaces/IAuth';

import {
  AuthWrapper,
  ErrorTooltip,
  Form,
  Item,
  Label,
  SubmitButtonWrapper,
} from '../Authorization.styled';

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
    if (!response?.isSuccess) {
      return setError(response?.message || 'Something went wrong');
    }
    setLoginUser(true);
  };

  return (
    <AuthWrapper className="login-container">
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
          <SubmitButtonWrapper>
            <StyledButton label="sign in" type="submit" />
          </SubmitButtonWrapper>
        </Item>
        {error && <ErrorTooltip $isGlobal>{error}</ErrorTooltip>}
      </Form>
    </AuthWrapper>
  );
};

export default LoginForm;
