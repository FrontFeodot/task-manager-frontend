import { useEffect, useState } from 'react';
import keys from 'lodash/keys';

import { IAuthTabs } from '@components/authorization/tabs/Tabs.types';
import Tabs from '@components/authorization/tabs/Tabs';
import LoginForm from '@components/authorization/loginForm/LoginForm';
import RegisterForm from '@components/authorization/registerForm/RegisterForm';

import * as S from './Login.styled';
import { useUserState } from 'common/providers/userProvider/useUserState';
import { useNavigate } from 'react-router-dom';

const Login = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<IAuthTabs>(IAuthTabs.LOGIN);
  const isLoggedIn = useUserState((s) => s.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/board');
    }
  }, [isLoggedIn]);
  console.log(currentTab);
  return (
    <S.Wrapper>
      <S.LoginContainer>
        <Tabs<IAuthTabs>
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabs={keys(IAuthTabs)}
        />
        {currentTab === IAuthTabs.LOGIN ? <LoginForm /> : <RegisterForm />}
      </S.LoginContainer>
    </S.Wrapper>
  );
};

export default Login;
