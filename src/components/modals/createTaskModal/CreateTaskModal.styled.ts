import {
  DESKTOP,
  TABLET,
  MOBILE,
  TABLET_DESKTOP,
} from '@common/utils/mediaHelper';
import styled from 'styled-components';

export const CreateTaskModal = styled.div`
  position: relative;

  width: 60%;
  height: auto;
  padding: 36px 16px 16px;

  z-index: 101;
  background-color: #2f303d;
  overflow: hidden;

  @media (${DESKTOP}) {
    width: 60%;
    height: 80%;
    min-width: 1024px;
    max-height: 880px;
  }

  @media (${TABLET}) {
    width: 80%;
    height: 80%;
    max-height: 880px;
  }

  @media (${MOBILE}) {
    width: 100%;
    height: 100%;
    max-height: 100%;
  }

  @media (${TABLET_DESKTOP}) {
    border-radius: 16px;
    box-shadow:
      2px 4px 8px rgba(0, 0, 0, 0.2),
      0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;
