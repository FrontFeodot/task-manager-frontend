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

  background-color: ${(props) => props.theme.modalBg};
  overflow: auto;

  @media (${DESKTOP}) {
    width: 60%;
    min-width: 1024px;
    max-height: calc(100% - 142px);
  }

  @media (${TABLET}) {
    width: 80%;
    max-height: 100%;
  }

  @media (${MOBILE}) {
    width: 100%;
  }

  @media (${TABLET_DESKTOP}) {
    border-radius: 16px;
    box-shadow:
      2px 4px 8px rgba(0, 0, 0, 0.2),
      0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;
