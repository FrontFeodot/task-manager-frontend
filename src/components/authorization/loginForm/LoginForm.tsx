import TextInput from '@components/textInput/TextInput';
import * as S from './LoginForm.styled';
import { useEffect, useState } from 'react';
import apiHandler from 'common/api/apiHandler';
import { IApiMethod } from 'common/interfaces/IApiHandler';
import StyledButton from '@components/styledButton/StyledButton';
import { ErrorTooltip, Form, Item, Label } from '../Authorization.styled';
import { auth } from 'common/api/auth';
import { emailRegex } from 'common/utils/regex';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  getEmailConfig,
  getPasswordConfig,
} from '../registerForm/registerConfig';
import { get } from 'lodash';
import CustomError from 'common/api/error';

const LoginForm = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = async (data: Record<string, any>) => {
    setError(null);
    const { email, password } = data;
    const response = await auth(email, password);
    console.log(response);
    if (response instanceof CustomError) {
      setError(response.message);
    }
  };
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

  return (
    <S.Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Item>
          <Label>Enter your E-Mail</Label>
          <TextInput config={emailConfig} />
          {errors.email && (
            <ErrorTooltip>{`${get(errors, 'email.message')}`}</ErrorTooltip>
          )}
        </Item>
        <Item>
          <Label>Enter your password</Label>
          <TextInput config={passwordConfig} type="password" />
          {errors.password && (
            <ErrorTooltip>{`${get(errors, 'password.message')}`}</ErrorTooltip>
          )}
        </Item>
        <Item>
          <StyledButton label="sign in" type="submit" />
        </Item>
        {error && <ErrorTooltip isGlobal>{error}</ErrorTooltip>}
      </Form>
    </S.Wrapper>
  );
};

export default LoginForm;
