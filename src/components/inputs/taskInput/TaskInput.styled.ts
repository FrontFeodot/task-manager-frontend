import styled from 'styled-components';
import { Text } from '@components/text/TextCommon.styled';

export const TaskInputContainer = styled.div<{ $isTitleView: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: ${({ $isTitleView }) => ($isTitleView ? 'auto' : '100%')};
  overflow-x: ${({ $isTitleView }) => ($isTitleView ? 'initial' : 'auto')};
`;

export const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};
`;

export const TitleComponent = styled(Text)`
  font-size: ${(props) => props.theme.fontXXL};
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s;
  word-break: break-word;
`;

export const EditableDiv = styled.div<{
  $isTitleView: boolean;
  $isCreateTask?: boolean;
}>`
  height: 100%;
  overflow: auto;
  background-color: ${(props) => props.theme.inputBg};
  border: ${({ $isTitleView, $isCreateTask, theme }) =>
    $isTitleView && !$isCreateTask ? 'none' : theme.borderCommon};
  color: ${(props) => props.theme.textPrimary};
  padding: 8px;
  border-radius: 8px;
  font-size: ${({ theme, $isTitleView }) =>
    $isTitleView ? theme.fontXXL : theme.fontMD};
  word-wrap: break-word;
  white-space: pre-wrap;
  cursor: pointer;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border: ${({ theme }) => theme.inputBorder};
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
    cursor: text;
  }

  &:hover:not(:focus) {
    color: ${(props) => props.theme.successColor};
  }
`;
