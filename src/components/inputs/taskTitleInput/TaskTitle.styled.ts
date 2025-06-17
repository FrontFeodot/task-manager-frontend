import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

export const TaskInputContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: auto;
`;

export const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};
`;

export const EditableDiv = styled.div<{
  $isCreateTask?: boolean;
}>`
  height: 100%;
  overflow: auto;
  background-color: ${(props) => props.theme.inputBg};
  border: ${({ $isCreateTask, theme }) =>
    !$isCreateTask ? 'none' : theme.borderCommon};
  color: ${(props) => props.theme.textPrimary};
  padding: 8px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontXXL};
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

  &:hover:not(:focus),
  &:hover:not(:focus) > * {
    color: ${(props) => props.theme.successColor} !important;
  }

  & img {
    max-width: 100%;
    max-height: 100%;
  }
  & * {
    padding: 0;
  }
`;
