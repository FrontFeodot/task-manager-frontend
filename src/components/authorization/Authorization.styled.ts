import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
  transition: all ease-in 1s;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.textPrimary};
  font-size: ${(props) => props.theme.fontMD};
  transition: all ease-in 1s;
`;

export const SubmitButtonWrapper = styled.div`
  width: 100%;
  height: 36px;
`;
