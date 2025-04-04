import styled from 'styled-components';

export const SelectWrapper = styled.div``;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontMD};

  background-color: ${(props) => props.theme.inputBg};
  border: ${(props) => props.theme.borderCommon};
  color: ${(props) => props.theme.textPrimary};

  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.successColor};
  }

  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    color 0.2s;

  &:focus {
    outline: none;

    border-color: ${(props) => props.theme.successColor};
    box-shadow: 0 0 5px rgba(0, 191, 166, 0.5);
  }
`;

export const Label = styled.label`
  font-size: ${(props) => props.theme.fontMD};
  color: ${(props) => props.theme.textDisabled};
  margin-bottom: 4px;
  display: block;
`;
