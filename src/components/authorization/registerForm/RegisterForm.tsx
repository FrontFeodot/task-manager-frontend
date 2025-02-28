import { useState } from 'react';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';

import AuthInput from '@components/inputs/authInput/AuthInput';
import StyledButton from '@components/styledButton/StyledButton';

import postRegister from '@common/api/register';
import { IPostRegister } from '@common/interfaces/IAuth';
import { setLoginUser } from '@common/providers/userProvider/useUserState';

import { ErrorTooltip, Form, Item, Label } from '../Authorization.styled';
import {
  getConfirmPasswordConfig,
  getEmailConfig,
  getPasswordConfig,
} from './registerConfig';

import * as S from './RegisterForm.styled';

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
    <S.Wrapper>
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
          <StyledButton label="sign up" type="submit" />
        </Item>
        {error && <ErrorTooltip isGlobal>{error}</ErrorTooltip>}
      </Form>
    </S.Wrapper>
  );
};

export default RegisterForm;
