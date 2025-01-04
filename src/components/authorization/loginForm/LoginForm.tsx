import TextInput from '@components/textInput/TextInput';
import * as S from './LoginForm.styled';
import { useState } from 'react';
import apiHandler from 'common/api/apiHandler';
import { IApiMethod } from 'common/interfaces/IApiHandler';

const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget?.value);
  };
  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget?.value);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiHandler({
      method: IApiMethod.POST,
      url: '/login',
      payload: {
        username,
        password,
      },
    });
  };
  return (
    <S.Wrapper>
      <S.LoginForm onSubmit={onSubmit}>
        <S.FormItem>
          <TextInput value={username} onChange={handleUserNameChange} />
        </S.FormItem>
        <S.FormItem>
          <TextInput
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
        </S.FormItem>
        <S.FormItem>
          <S.LoginSubmit type="submit">Submit</S.LoginSubmit>
        </S.FormItem>
      </S.LoginForm>
    </S.Wrapper>
  );
};

export default LoginForm;
