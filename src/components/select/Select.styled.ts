import styled from 'styled-components';

export const Label = styled.label`
  font-size: ${(props) => props.theme.fontMD};
  color: ${(props) => props.theme.textDisabled};
  margin-bottom: 4px;
  display: block;
`;

export const SelectWrapper = styled.div<{ $isCreateTask?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;

  width: ${({ $isCreateTask }) =>
    $isCreateTask ? '100%' : 'calc(100% - 50px);'};
`;

export const StyledSelectWrapper = styled.div<{ $isCreateTask?: boolean }>`
  position: relative;
  width: 100%;
  border-radius: 8px;
  border: ${({ theme, $isCreateTask }) =>
    $isCreateTask ? theme.borderCommon : 'none'};
  background-color: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;
`;

export const SelectedOption = styled.div`
  padding: 8px;
  font-size: ${(props) => props.theme.fontMD};
  background-color: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.textPrimary};
  border-radius: 8px;
  transition: background-color 0.2s;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: ${(props) => props.theme.successColor};
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: max-content;
  max-width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.inputBg};
  border: ${({ theme }) => theme.borderCommon};
  border-radius: 8px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Option = styled.div`
  padding: 8px;
  font-size: ${(props) => props.theme.fontMD};
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;
  transition: background-color 0.2s;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  &:hover {
    color: ${(props) => props.theme.successColor};
  }
`;
