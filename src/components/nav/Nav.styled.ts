import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MOBILE, TABLET } from '@common/utils/mediaHelper';

export const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  z-index: 101;

  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: center;
  align-items: center;
  padding: 0 64px;
  background-color: ${(props) => props.theme.bgSecondary};

  @media (${TABLET}) {
    padding: 0 32px;
  }
  @media (${MOBILE}) {
    padding: 0 16px;
  }
`;

export const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 60px;

  @media (${MOBILE}) {
    gap: 40px;
  }
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  text-transform: uppercase;
`;

export const NavItemName = styled(Link)`
  font-size: ${(props) => props.theme.fontMD};
  color: ${(props) => props.theme.link};
  text-decoration: none;

  @media (${MOBILE}) {
    font-size: ${(props) => props.theme.fontSM};
  }
`;

export const ButtonWrapper = styled.div`
  width: auto;
  height: 40px;

  @media (${TABLET}) {
    height: 36px;
  }

  @media (${TABLET}) {
    .logout_button .button_label {
      display: none;
    }
  }
`;
