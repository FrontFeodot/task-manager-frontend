import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUserState } from '@common/providers/userProvider/useUserState';

import LoginForm from '@components/authorization/loginForm/LoginForm';
import RegisterForm from '@components/authorization/registerForm/RegisterForm';
import Tabs from '@components/authorization/tabs/Tabs';

import * as S from './Login.styled';
import { authTabsSchema } from './tabsConfig';

const Login = (): JSX.Element => {
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState<string>(pathname);
  const isLoggedIn = useUserState((s) => s.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/board');
    }
  }, [isLoggedIn]);

  return (
    <S.Wrapper>
      <S.LoginContainer>
        <Tabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabs={authTabsSchema}
        />
        {currentTab === '/login' ? <LoginForm /> : <RegisterForm />}
      </S.LoginContainer>
    </S.Wrapper>
  );
};

export default Login;
