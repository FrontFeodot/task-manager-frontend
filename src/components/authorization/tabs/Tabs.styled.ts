import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 42px;
  flex-direction: row;
  ${(props) => props.theme.flexbox};
`;

export const Tab = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;

  ${({ $isActive, theme }) =>
    $isActive && `border-bottom: 2px solid ${theme.link}`};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.buttonBg : theme.bgTertiary};

  ${(props) => props.theme.flexbox};
`;
