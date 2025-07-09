import get from 'lodash/get';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { postLogin } from '@common/api/auth';
import { IPostLogin } from '@common/interfaces/IAuth';
import { setLoginUser } from '@common/providers/userProvider/useUserState';

import ErrorTooltip from '@components/error/ErrorTooltip.styled';
import AuthInput from '@components/inputs/authInput/AuthInput';
import StyledButton from '@components/styledButton/StyledButton';

import {
  AuthWrapper,
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
  } = useForm<IPostLogin>({ mode: 'onChange' });

  const onSubmit = async (data: IPostLogin) => {
    setError(null);
    const response = await postLogin(data);
    if (!response?.isSuccess) {
      setError(response?.message || 'Something went wrong');
      return;
    }
    setLoginUser(true);
  };

  return (
    <AuthWrapper className="login-container">
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Item>
          <Label htmlFor="email">E‑mail</Label>
          <AuthInput
            id="email"
            type="email"
            config={register('email', {
              required: 'Email is required',
              onChange: () => clearErrors(),
            })}
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <ErrorTooltip role="alert">
              {get(errors, 'email.message')}
            </ErrorTooltip>
          )}
        </Item>

        <Item>
          <Label htmlFor="password">Password</Label>
          <AuthInput
            id="password"
            type="password"
            config={register('password', {
              required: 'Password is required',
              onChange: () => clearErrors(),
            })}
            autoComplete="current-password"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <ErrorTooltip role="alert">
              {get(errors, 'password.message')}
            </ErrorTooltip>
          )}
        </Item>

        <Item>
          <SubmitButtonWrapper>
            <StyledButton label="Sign in" type="submit" />
          </SubmitButtonWrapper>
        </Item>

        {error && (
          <ErrorTooltip $isGlobal role="alert">
            {error}
          </ErrorTooltip>
        )}
      </Form>
    </AuthWrapper>
  );
};

export default LoginForm;
