import styled from 'styled-components';

export const StyledSelect = styled.select`
  background-color: #252627;
  border: 1px solid #3a3b3c;
  color: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
  font-size: 1em;
  width: 100%;

  cursor: pointer;

  &:hover {
    color: #00bfa6;
  }

  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    color 0.2s;

  &:focus {
    outline: none;
    border-color: #00bfa6;
    box-shadow: 0 0 5px rgba(0, 191, 166, 0.5);
  }
`;

export const Label = styled.label`
  font-size: 0.9em;
  color: #a0a0a0;
  margin-bottom: 4px;
  display: block;
`;
