import {
  DESKTOP,
  MOBILE,
  TABLET,
  TABLET_DESKTOP,
} from '@common/utils/mediaHelper';
import styled from 'styled-components';

export const TaskModalWrapper = styled.div`
  padding: 36px 16px 16px;
  position: relative;
  z-index: 101;
  background-color: ${(props) => props.theme.modalBg};

  @media (${DESKTOP}) {
    width: 60%;
    height: 60%;
    min-width: 1024px;
    min-height: 600px;
  }

  @media (${TABLET}) {
    width: 80%;
    height: 80%;
  }

  @media (${MOBILE}) {
    width: 100%;
    height: 100%;
  }

  @media (${TABLET}) {
    overflow: hidden;
  }

  @media (${TABLET_DESKTOP}) {
    border-radius: 16px;
    box-shadow:
      2px 4px 8px rgba(0, 0, 0, 0.2),
      0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

export const TaskScrollContainer = styled.div`
  padding: 16px;
  height: 100%;
`;
