import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

import { DESKTOP, MOBILE, TABLET } from '@common/utils/mediaHelper';

export const ModalWrapper = styled.div`
  ${(props) => props.theme.flexbox};
  display: flex;
  flex-direction: column;

  width: 33%;
  height: auto;
  padding: 24px;

  background-color: ${(props) => props.theme.modalBg};
  border-radius: 16px;
  box-shadow:
    2px 4px 8px rgba(0, 0, 0, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.3);

  @media (${DESKTOP}) {
    min-width: 576px;
  }
  @media (${TABLET}) {
    min-width: 485px;
    padding: 8px;
  }
  @media (${MOBILE}) {
    min-width: 90%;
    padding: 16px;
  }
`;

export const ModalLabel = styled(Text)`
  ${(props) => props.theme.flexbox};

  height: 64px;

  font-size: ${(props) => props.theme.fontXXL};
  color: ${(props) => props.theme.textPrimary};

  @media (${TABLET}) {
    font-size: ${(props) => props.theme.fontXL};
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 16px;

  color: ${(props) => props.theme.textPrimary};
`;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  background-color: ${(props) => props.theme.bgTertiary};

  width: 100%;
  height: auto;
  padding: 16px;
  border-radius: 8px;
`;

export const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

export const RadioButtonLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;
  gap: 15px;
  width: 100%;
`;

export const StyledRadio = styled(Text)`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.bgTertiary};
  border: 2px solid ${({ theme }) => theme.buttonBorderColor};
  border-radius: 8px;
  margin-right: 10px;
  transition: all 0.2s ease;

  ${({ theme }) => theme.shadow};

  ${HiddenRadio}:checked + ${RadioButtonLabel} & {
    background: ${({ theme }) => theme.buttonBg};
    border-color: ${({ theme }) => theme.buttonBg};
  }

  ${RadioWrapper}:hover & {
    border-color: ${({ theme }) => theme.link};
  }
`;

export const RadioLabelContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;

  & select {
    width: 208px;
    @media (${MOBILE}) {
      width: auto;
    }
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  min-height: 36px;
`;
