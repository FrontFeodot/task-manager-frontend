import { useState } from 'react';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';

import AuthInput from '@components/inputs/authInput/AuthInput';
import StyledButton from '@components/styledButton/StyledButton';
import ErrorTooltip from '@components/error/ErrorTooltip.styled';

import postRegister from '@common/api/postRegister';
import { IPostRegister } from '@common/interfaces/IAuth';
import { setLoginUser } from '@common/providers/userProvider/useUserState';

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
  } = useForm<IPostRegister>({
    mode: 'onBlur',
  });
  const onSubmit = async (data: IPostRegister) => {
    setError(null);
    const response = await postRegister(data);

    if (response?.isError) {
      return setError(response.message);
    }
    setLoginUser(true);
  };

  const emailConfig = getEmailConfig(register, clearErrors);
  const passwordConfig = getPasswordConfig(register);
  const confirmPasswordConfig = getConfirmPasswordConfig(register, getValues);

  return (
    <AuthWrapper className="register-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Item>
          <Label>Enter your E-mail</Label>
          <AuthInput
            onChange={() => {
              clearErrors();
            }}
            config={emailConfig}
          />
          {errors.email && (
            <ErrorTooltip
              dangerouslySetInnerHTML={{
                __html: `${get(errors, 'email.message')}`,
              }}
            />
          )}
        </Item>
        <Item>
          <Label>Enter your password</Label>
          <AuthInput config={passwordConfig} type="password" />
          {errors.password && (
            <ErrorTooltip
              dangerouslySetInnerHTML={{
                __html: `${get(errors, 'password.message')}`,
              }}
            />
          )}
        </Item>
        <Item>
          <Label>Confirm your password</Label>
          <AuthInput config={confirmPasswordConfig} type="password" />
          {errors.confirmPassword && (
            <ErrorTooltip
              dangerouslySetInnerHTML={{
                __html: `${get(errors, 'confirmPassword.message')}`,
              }}
            />
          )}
        </Item>
        <Item>
          <SubmitButtonWrapper>
            <StyledButton label="sign up" type="submit" />
          </SubmitButtonWrapper>
        </Item>
        {error && <ErrorTooltip $isGlobal>{error}</ErrorTooltip>}
      </Form>
    </AuthWrapper>
  );
};

export default RegisterForm;
