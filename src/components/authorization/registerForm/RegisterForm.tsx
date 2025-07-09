import get from 'lodash/get';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import postRegister from '@common/api/postRegister';
import { IPostRegister } from '@common/interfaces/IAuth';
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
import {
  getConfirmPasswordConfig,
  getEmailConfig,
  getPasswordConfig,
} from './registerConfig';

const RegisterForm = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    clearErrors,
  } = useForm<IPostRegister>({ mode: 'onBlur' });

  const onSubmit = async (data: IPostRegister) => {
    setError(null);
    const response = await postRegister(data);
    if (response?.isError) {
      setError(response.message);
      return;
    }
    setLoginUser(true);
  };

  const emailConfig = getEmailConfig(register, clearErrors);
  const passwordConfig = getPasswordConfig(register);
  const confirmPasswordConfig = getConfirmPasswordConfig(register, getValues);

  return (
    <AuthWrapper className="register-container">
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Item>
          <Label htmlFor="email">E‑mail</Label>
          <AuthInput
            id="email"
            type="email"
            config={emailConfig}
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <ErrorTooltip
              role="alert"
              dangerouslySetInnerHTML={{
                __html: `${get(errors, 'email.message')}`,
              }}
            />
          )}
        </Item>

        <Item>
          <Label htmlFor="password">Password</Label>
          <AuthInput
            id="password"
            type="password"
            config={passwordConfig}
            autoComplete="new-password"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <ErrorTooltip
              role="alert"
              dangerouslySetInnerHTML={{
                __html: `${get(errors, 'password.message')}`,
              }}
            />
          )}
        </Item>

        <Item>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <AuthInput
            id="confirmPassword"
            type="password"
            config={confirmPasswordConfig}
            autoComplete="new-password"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          />
          {errors.confirmPassword && (
            <ErrorTooltip
              role="alert"
              dangerouslySetInnerHTML={{
                __html: `${get(errors, 'confirmPassword.message')}`,
              }}
            />
          )}
        </Item>

        <Item>
          <SubmitButtonWrapper>
            <StyledButton label="Sign up" type="submit" />
          </SubmitButtonWrapper>
        </Item>

        {error && (
          <ErrorTooltip
            $isGlobal
            role="alert"
            dangerouslySetInnerHTML={{ __html: `${error}` }}
          />
        )}
      </Form>
    </AuthWrapper>
  );
};

export default RegisterForm;
