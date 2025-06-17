import { useEffect } from 'react';

import initialize from '@common/helpers/initialize';
import AppRouter from '@common/routes/Routes';

import ModalManager from '@components/modals/modalManager/ModalManager';
import NavMenu from '@components/nav/Nav';

import * as S from './App.styled';

import './App.css';

const App = (): JSX.Element => {
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
