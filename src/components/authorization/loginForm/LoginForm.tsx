import { useState } from 'react';
import get from 'lodash/get';
import { useForm } from 'react-hook-form';

import TextInput from '@components/textInput/TextInput';
import StyledButton from '@components/styledButton/StyledButton';

import CustomError from '@common/api/error';
import { setLoginUser } from '@common/providers/userProvider/useUserState';
import { postLogin } from '@common/api/auth';

import { ErrorTooltip, Form, Item, Label } from '../Authorization.styled';
import * as S from './LoginForm.styled';
import { IPostLogin } from '@common/interfaces/IAuth';

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
  const onSubmit = async (data: IPostLogin) => {
    setError(null);
    const response = await postLogin(data);

    console.log(response);
    if (response instanceof CustomError) {
      return setError(response.message);
    }
    setLoginUser(true);
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
          <TextInput config={emailConfig} type="email" />
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
