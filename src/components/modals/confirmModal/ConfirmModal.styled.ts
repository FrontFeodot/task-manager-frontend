import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';
import StyledButton from '@components/styledButton/StyledButton';
import { Text } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const ConfirmModalWrapper = styled.div`
  ${(props) => props.theme.flexbox};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;


  min-height: 184px;
  z-index: 101;
  background-color: #2f303d;
  padding: 24px;
  border-radius: 16px;
  box-shadow:
    2px 4px 8px rgba(0, 0, 0, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.3);

  @media (${TABLET_DESKTOP}) {
    width: 28%;
    height: 15%;
    min-width: 485px;
  }

  @media (${MOBILE}) {
    width: 90%;
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
