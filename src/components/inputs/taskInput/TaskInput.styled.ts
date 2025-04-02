import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

export const TaskInputContainer = styled.div<{ $isTitleView: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: ${({ $isTitleView }) => ($isTitleView ? 'auto' : 'auto')};
`;

export const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSM};
  color: #a0a0a0;
`;

export const TitleValue = styled(Text)`
  font-size: ${(props) => props.theme.fontXXL};
  font-weight: bold;

  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #00bfa6;
  }
`;

export const DescriptionValue = styled(Text)`
  max-height: 190px;
  min-height: 124px;
  overflow: auto;

  background-color: #252627;
  border: 1px solid #3a3b3c;
  color: #f0f0f0;
  padding: 8px;
  border-radius: 8px;

  font-size: ${(props) => props.theme.fontMD};
  cursor: pointer;
  word-wrap: break-word;
  white-space: pre-wrap;

  transition:
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    color: #00bfa6;
  }
`;

export const StyledInput = styled.input`
  background-color: #252627;
  border: 1px solid #3a3b3c;
  color: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontMD};
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

export const StyledTextArea = styled.textarea`
  padding: 8px;

  border-radius: 8px;
  height: 190px;

  background-color: #252627;
  border: 1px solid #3a3b3c;
  color: #f0f0f0;
  font-size: ${(props) => props.theme.fontMD};

  box-sizing: border-box;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #1e90ff;
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }
`;
