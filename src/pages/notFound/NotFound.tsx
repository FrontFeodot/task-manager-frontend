import { useNavigate } from 'react-router-dom';

import * as S from './NotFound.styled';

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  const goHome = (): void => navigate('/');

  return (
    <S.NotFoundWrapper>
      <S.NotFoundLabel>Page not found =(</S.NotFoundLabel>
      <S.GoHomePage onClick={goHome}>Return to home page?</S.GoHomePage>
    </S.NotFoundWrapper>
  );
};

export default NotFound;
