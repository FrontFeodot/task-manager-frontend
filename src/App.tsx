import React, { useEffect } from 'react';

import NavMenu from '@components/nav/Nav';
import ModalManager from '@components/modalManager/ModalManager';

import AppRouter from 'common/routes/Routes';
import initialize from '@common/helpers/initialize';
import useAppParams from '@common/hooks/useAppParams';

import * as S from './App.styled';
import './App.css';

const App = (): JSX.Element => {
  useAppParams();

  useEffect(() => {
    initialize();
  }, []);

  return (
    <S.AppWrapper>
      <NavMenu />
      <AppRouter />
      <ModalManager />
    </S.AppWrapper>
  );
};

export default App;
