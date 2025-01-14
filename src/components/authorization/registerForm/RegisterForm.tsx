import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { get } from 'lodash';

import TextInput from '@components/textInput/TextInput';
import StyledButton from '@components/styledButton/StyledButton';

import CustomError from '@common/api/error';
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
    console.log('email, password', data);

    const error = await postRegister(data);
    console.log('await postRegister(data)', error);

    if (error instanceof CustomError) {
      console.log('error instanceof CustomError', error);
      return setError(error.message);
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
          <TextInput
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
          <TextInput config={passwordConfig} type="password" />
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
          <TextInput config={confirmPasswordConfig} type="password" />
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
