import { useNavigate } from 'react-router-dom';

import { useUserState } from '@common/providers/userProvider/useUserState';
import StyledButton from '@components/styledButton/StyledButton';
import { logout } from '@common/api/auth';
import Icon from '@common/icons/Icon';

import * as S from './Nav.styled';

const NavMenu = (): JSX.Element => {
  const isLoggedIn = useUserState((s) => s.isLoggedIn);
  const navigate = useNavigate();

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
          Icon={<Icon name={isLoggedIn ? 'logout' : 'login'} size={18} />}
          className="logout_button"
        />
      </S.ButtonWrapper>
    </S.NavWrapper>
  );
};

export default NavMenu;
