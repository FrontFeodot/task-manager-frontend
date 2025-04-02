import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';
import styled from 'styled-components';

export const Wrapper = styled.div`
  ${(props) => props.theme.flexbox};

  width: 100%;
  height: auto;
`;

export const LoginContainer = styled.div`
  ${(props) => props.theme.flexbox};
  flex-direction: column;

  width: 100%;
  height: auto;

  background-color: ${(props) => props.theme.bgTertiary};

  @media (${TABLET_DESKTOP}) {
    min-width: 485px;
    max-width: 700px;
  }
  @media (${MOBILE}) {
    max-height: 540px;
  }
`;
