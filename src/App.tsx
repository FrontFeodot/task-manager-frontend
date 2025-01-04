import React from 'react';

import NavMenu from '@components/nav/Nav';
import Main from '@components/main/Main';

import * as S from './App.styled';
import AppRouter from 'common/routes/Routes';

import './App.css'

const App = (): JSX.Element => {
  return (
    <S.AppWrapper>
      <NavMenu />
      <AppRouter />
      {/*  <Main /> */}
    </S.AppWrapper>
  );
};

export default App;
