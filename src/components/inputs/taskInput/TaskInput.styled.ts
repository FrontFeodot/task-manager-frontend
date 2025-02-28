import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

export const TaskInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled(Text)`
  font-size: 0.875rem;
  color: #a0a0a0;
`;

export const TitleValue = styled(Text)`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #00bfa6;
  }
`;

export const DescriptionValue = styled(Text)`
  background-color: #252627;
  border: 1px solid #3a3b3c;
  color: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  transition: color 0.2s;
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

export const StyledTextArea = styled.textarea`
  background-color: #252627;
  border: 1px solid #3a3b3c;
  color: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
  font-size: 1em;
  min-height: 120px;
  height: auto;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  &:focus {
    outline: none;
    border-color: #1e90ff;
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }
`;

export const ButtonContainer = styled.div`
  ${(props) => props.theme.flexbox};

  width: 20%;
  max-width: 120px;
  height: 30px;

  & button {
    padding: 0;
    font-size: 0.75rem;
  }
`;
