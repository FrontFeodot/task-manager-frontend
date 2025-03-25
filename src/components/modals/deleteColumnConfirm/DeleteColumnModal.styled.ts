import { Text, TextInline } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  ${(props) => props.theme.flexbox};
  display: flex;
  flex-direction: column;

  width: 33%;
  height: 30%;
  z-index: 101;
  background-color: #2f303d;
  padding: 16px;
  border-radius: 16px;
  box-shadow:
    2px 4px 8px rgba(0, 0, 0, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.3);
`;

export const ModalLabel = styled.div`
  ${(props) => props.theme.flexbox};
  height: 50%;

  font-size: 1.5rem;
  color: ${(props) => props.theme.textPrimary};
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
  height: 48px;
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

export const StyledRadio = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.bgTertiary};
  border: 2px solid ${({ theme }) => theme.textAccent};
  border-radius: 8px;
  margin-right: 10px;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadow};

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
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  width: 100%;
`;

export const ButtonWrapper = styled.div``;
