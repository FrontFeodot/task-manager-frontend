import styled from 'styled-components';

import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';

export const Wrapper = styled.div`
  ${(props) => props.theme.flexbox};
  width: 100%;
  height: auto;
`;

export const LoginContainer = styled.div`
  ${(props) => props.theme.flexbox};
  flex-direction: column;

  width: 100%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgTertiary};

  @media (${TABLET_DESKTOP}) {
    min-width: 485px;
    max-width: 700px;
  }
  @media (${MOBILE}) {
    min-height: 420px;
    max-height: 100%;
  }
`;
