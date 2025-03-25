import { Text } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const EditorInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: auto;
`;
export const Label = styled(Text)`
  font-size: 0.875rem;
  color: #a0a0a0;
`;

const columnPresentationStyles = `
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #3a3b3c;

  background: linear-gradient(145deg, #202124, #2a2b2e);
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

  ${({ $isColumnCreate }) => ($isColumnCreate ? 'cursor: pointer' : '')};

  ${({ $isColumn }) => ($isColumn ? columnPresentationStyles : '')};
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
  font-size: 1.125rem;
  font-weight: bold;
`;

export const EditSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  background-color: #252627;
  border: 1px solid #3a3b3c;
  color: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
  font-size: 1em;
  width: 100%;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  &:focus {
    outline: none;
    border-color: #1e90ff;
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }
`;

export const ButtonContainer = styled.div<{ $hasCancelButton?: boolean }>`
  ${(props) => props.theme.flexbox};

  margin: 16px 8px 8px 0;
  gap: 8px;
  width: ${({ $hasCancelButton }) => ($hasCancelButton ? '50%' : '25%')};
  height: 30px;

  & button {
    padding: 0;
    font-size: 0.75rem;
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
