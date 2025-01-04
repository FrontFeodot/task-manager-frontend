import React from 'react';

import * as S from './Nav.styled';

const NavMenu = (): JSX.Element => {
  return (
    <S.NavWrapper>
      <S.NavItem>
        <S.NavItemName to="/">Home</S.NavItemName>
      </S.NavItem>
      <S.NavItem>
        <S.NavItemName to="/board">Board</S.NavItemName>
      </S.NavItem>
      <S.NavItem>
        <S.NavItemName to="/login">Login</S.NavItemName>
      </S.NavItem>
    </S.NavWrapper>
  );
};

export default NavMenu;
