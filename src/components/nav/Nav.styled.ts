import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
  background-color: ${(props) => props.theme.bgSecondary};
`;

export const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 60px;
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
  font-size: 1rem;
  color: ${(props) => props.theme.link};
  text-decoration: none;
`;

export const ButtonWrapper = styled.div`
  width: auto;
`;
