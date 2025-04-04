import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';
import { MOBILE } from '@common/utils/mediaHelper';

export const TaskInputContainer = styled.div<{ $isTitleView: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: ${({ $isTitleView }) => ($isTitleView ? 'auto' : 'auto')};
`;

export const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};
`;

export const TitleValue = styled(Text)`
  font-size: ${(props) => props.theme.fontXXL};
  font-weight: bold;

  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.successColor};
  }
`;

export const DescriptionValue = styled(Text)`
  min-height: 124px;
  height: 100%;
  overflow: auto;

  background-color: ${(props) => props.theme.inputBg};
  border: ${(props) => props.theme.borderCommon};
  color: ${(props) => props.theme.textPrimary};
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
    color: ${(props) => props.theme.successColor};
  }

  @media (${MOBILE}) {
    height: 160px;
  }
`;

export const StyledInput = styled.input`
  background-color: ${(props) => props.theme.inputBg};
  border: ${(props) => props.theme.borderCommon};
  color: ${(props) => props.theme.textPrimary};
  padding: 8px;
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontMD};
  width: 100%;
  transition:
    border 0.2s,
    box-shadow 0.2s;

  &:focus {
    border: ${({ theme }) => theme.inputBorder};
    outline: none;
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }
`;

export const StyledTextArea = styled.textarea`
  padding: 8px;

  border-radius: 8px;
  height: 190px;

  background-color: ${(props) => props.theme.inputBg};
  border: ${(props) => props.theme.borderCommon};
  color: ${(props) => props.theme.textPrimary};
  font-size: ${(props) => props.theme.fontMD};

  box-sizing: border-box;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border: ${({ theme }) => theme.inputBorder};
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }

  @media (${MOBILE}) {
    height: 160px;
  }
`;
