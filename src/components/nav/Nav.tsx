import React from 'react';

import * as S from './Nav.styled';
import { useUserState } from '@common/providers/userProvider/useUserState';
import StyledButton from '@components/styledButton/StyledButton';
import { useNavigate } from 'react-router-dom';
import { logout } from '@common/api/auth';

const NavMenu = (): JSX.Element => {
  const isLoggedIn = useUserState((s) => s.isLoggedIn);
  const navigate = useNavigate();
  const clickHandler = (): void => {
    if (!isLoggedIn) {
      return navigate('/login');
    }
    return logout();
  };

  return (
    <S.NavWrapper>
      <S.NavItemsWrapper>
        <S.NavItem>
          <S.NavItemName to="/">Home</S.NavItemName>
        </S.NavItem>
        {isLoggedIn ? (
          <>
            <S.NavItem>
              <S.NavItemName to="/board">Board</S.NavItemName>
            </S.NavItem>
            <S.NavItem>
              <S.NavItemName to="/profile">Profile</S.NavItemName>
            </S.NavItem>
          </>
        ) : null}
      </S.NavItemsWrapper>
      <S.ButtonWrapper>
        <StyledButton
          label={isLoggedIn ? 'logout' : 'login'}
          onClick={clickHandler}
        />
      </S.ButtonWrapper>
    </S.NavWrapper>
  );
};

export default NavMenu;
