import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';
import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';

export const AuthWrapper = styled.div`
  ${(props) => props.theme.flexbox};
  flex-direction: column;

  width: 100%;
  height: auto;

  background-color: ${(props) => props.theme.bgTertiary};

  @media (${TABLET_DESKTOP}) {
    min-width: 485px;
    max-width: 700px;
  }
  &.login-container {
    max-height: 460px;
  }
  &.register-container {
    overflow: hidden;
  }
`;

export const Form = styled.form`
  ${(props) => props.theme.flexbox};
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: auto;
  gap: 30px;
  transition: all ease-in 1s;
  overflow: auto;

  @media (${MOBILE}) {
    padding: 48px 24px;
  }
  @media (${TABLET_DESKTOP}) {
    padding: 48px 40px;
  }
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

export const ErrorTooltip = styled.div<{ $isGlobal?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.errorBg};
  color: ${({ theme }) => theme.errorText};
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  font-size: ${(props) => props.theme.fontSM};

  white-space: nowrap;
  width: ${({ $isGlobal }) => ($isGlobal ? '100%' : 'auto')};
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

  & p,
  li {
    white-space: pre-wrap;
  }
`;

export const SubmitButtonWrapper = styled.div`
  width: 100%;
  height: 36px;
`;
