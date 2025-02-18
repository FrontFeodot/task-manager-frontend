import React, { useEffect } from 'react';

import NavMenu from '@components/nav/Nav';
import Main from '@components/main/Main';

import * as S from './App.styled';
import AppRouter from 'common/routes/Routes';

import './App.css';
import { useUserState } from '@common/providers/userProvider/useUserState';
import initialize from '@common/helpers/initialize';

const App = (): JSX.Element => {
  useEffect(() => {
    initialize();
    console.log(' initialize');
  }, []);

  return (
    <S.AppWrapper>
      <NavMenu />
      <AppRouter />
      {/*  <Main /> */}
    </S.AppWrapper>
  );
};

export default App;
