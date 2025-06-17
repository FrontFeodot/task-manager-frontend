import styled from 'styled-components';

import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';

import { Text } from '@components/text/TextCommon.styled';

export const ConfirmModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: ${(props) => props.theme.modalBg};
  padding: 24px;
  border-radius: 16px;
  box-shadow:
    2px 4px 8px rgba(0, 0, 0, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.3);

  width: auto;
  height: auto;
  @media (${TABLET_DESKTOP}) {
    min-width: 485px;
  }

  @media (${MOBILE}) {
    height: auto;
  }
`;

export const ConfirmTitle = styled(Text)`
  ${(props) => props.theme.flexbox};
  width: 100%;

  margin-bottom: 24px;

  font-size: ${(props) => props.theme.fontXXL};
  color: ${({ theme }) => theme.link};
`;

export const ConfirmMessage = styled(Text)`
  width: 100%;
  margin-bottom: auto;
  text-align: center;
  margin-bottom: 24px;

  font-size: ${(props) => props.theme.fontLG};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 40px;
`;

export const ConfirmButtonWrapper = styled.div`
  width: 20%;
  min-width: 132px;
  height: 40px;
`;
