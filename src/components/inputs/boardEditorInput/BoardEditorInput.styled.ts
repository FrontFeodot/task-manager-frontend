import { Text } from '@components/text/TextCommon.styled';
import styled, { DefaultTheme } from 'styled-components';

export const EditorInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: auto;
`;
export const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};
`;

const getColumnPresentationStyles = (theme: DefaultTheme) => `
  padding: 8px;
  border-radius: 4px;
  border: ${theme.borderCommon};

  background: ${theme.bgGradient};
`;

export const PresentationWrapper = styled.div<{
  $isColumn?: boolean;
  $isColumnCreate?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ $isColumnCreate }) =>
    $isColumnCreate ? 'center' : 'space-between'};
  align-items: center;
  color: ${({ theme }) => theme.textPrimary};
  ${({ $isColumnCreate }) => ($isColumnCreate ? 'cursor: pointer' : '')};

  ${({ $isColumn, theme }) =>
    $isColumn ? getColumnPresentationStyles(theme) : ''};
`;

export const PresentationButtons = styled.div`
  ${(props) => props.theme.flexbox};

  width: auto;
  height: 100%;

  gap: 16px;
`;

export const PresentationButtonWrapper = styled.div<{ $isRedButton?: boolean }>`
  ${(props) => props.theme.flexbox};

  width: 20px;
  height: 100%;
  cursor: pointer;

  &:hover {
    & svg {
      fill: ${({ $isRedButton, theme }) =>
        $isRedButton ? theme.errorBg : theme.link};
    }
  }
`;

export const TitleValue = styled(Text)`
  font-size: ${(props) => props.theme.fontLG};
  font-weight: bold;

  ${(props) => props.theme.collapsedText};
`;

export const EditSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  background-color: ${(props) => props.theme.bgTertiary};
  border: ${(props) => props.theme.borderCommon};
  color: ${(props) => props.theme.textPrimary};
  padding: 8px;
  border-radius: 8px;
  font-size: 1em;
  width: 100%;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  &:focus {
    outline: none;
    border: ${({ theme }) => theme.inputBorder};
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }
`;

export const ButtonContainer = styled.div<{ $hasCancelButton?: boolean }>`
  ${(props) => props.theme.flexbox};

  margin: 16px 8px 8px 0;
  gap: 8px;
  width: ${({ $hasCancelButton }) => ($hasCancelButton ? '100%' : '50%')};
  min-width: 124px;
  height: 30px;

  & .button_label {
    font-size: ${(props) => props.theme.fontXS};
  }
`;

export const ErrorContainer = styled(Text)`
  ${(props) => props.theme.flexbox};

  width: 100%;
  padding: 8px;
  margin: 8px 0;

  border-radius: 4px;

  background-color: ${(props) => props.theme.errorBg};
  color: ${(props) => props.theme.errorText};
  box-sizing: border-box;
`;
