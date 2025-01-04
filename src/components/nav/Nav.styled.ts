import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 60px;
  padding: 0 60px;
  background-color: ${(props) => props.theme.bgSecondary};
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
