import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

export const Form = styled.form`
  ${(props) => props.theme.flexbox};
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 30px;
  transition: all ease-in 1s;
`;

export const Item = styled.div`
  position: relative;
  width: 100%;
  transition: all ease-in 1s;
`;

export const Label = styled(Text)`
  padding: 10px 0;
  transition: all ease-in 1s;
`;

export const ErrorTooltip = styled.div<{ isGlobal?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.errorBg};
  color: ${({ theme }) => theme.errorText};
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  font-size: 14px;
  white-space: nowrap;
  width: ${({ isGlobal }) => (isGlobal ? '100%' : 'auto')};
  transition: all ease-in 1s;

  & p {
    color: ${({ theme }) => theme.errorText};
  }
  opacity: 1;
  transform: translateY(10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
`;
