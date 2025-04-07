import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { RiLoginBoxLine } from 'react-icons/ri';

import { useUserState } from '@common/providers/userProvider/useUserState';
import StyledButton from '@components/styledButton/StyledButton';
import { logout } from '@common/api/auth';

import * as S from './Nav.styled';
import { useTheme } from 'styled-components';

const NavMenu = (): JSX.Element => {
  const isLoggedIn = useUserState((s) => s.isLoggedIn);
  const navigate = useNavigate();
  const { textPrimary } = useTheme();

  const ButtonIcon = isLoggedIn ? RiLogoutBoxLine : RiLoginBoxLine;

  const clickHandler = (): void => {
    if (!isLoggedIn) {
      return navigate('/login');
    }
    navigate('/');
    return logout();
  };

  return (
    <S.NavWrapper className="navigation">
      <S.NavItemsWrapper>
        <S.NavItem>
          <S.NavItemName to="/">Home</S.NavItemName>
        </S.NavItem>
        {isLoggedIn ? (
          <>
            <S.NavItem>
              <S.NavItemName to="/board">Board</S.NavItemName>
            </S.NavItem>
            {/*             <S.NavItem>
              <S.NavItemName to="/profile">Profile</S.NavItemName>
            </S.NavItem> */}
          </>
        ) : null}
      </S.NavItemsWrapper>
      <S.ButtonWrapper>
        <StyledButton
          label={isLoggedIn ? 'logout' : 'login'}
          onClick={clickHandler}
          Icon={<ButtonIcon size={18} fill={textPrimary} />}
          className="logout_button"
        />
      </S.ButtonWrapper>
    </S.NavWrapper>
  );
};

export default NavMenu;
