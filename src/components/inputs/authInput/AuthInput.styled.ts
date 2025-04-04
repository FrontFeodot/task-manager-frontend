import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  align-items: center;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 100%;

  border: 1px solid ${(props) => props.theme.buttonBorderColor};
  padding: 10px 14px;

  color: ${(props) => props.theme.textPrimary};
  font-size: ${(props) => props.theme.fontMD};
  outline: none;
  background-color: ${(props) => props.theme.bgSecondary};

  transition: all 0.3s ease;

  ${(props) => props.theme.shadow};

  &:focus {
    border-color: ${(props) => props.theme.link};
    box-shadow: 0 0 5px ${(props) => props.theme.buttonBg};
  }

  &::placeholder {
    color: rgba(245, 246, 247, 0.6);
  }
`;

export const ToggleIcon = styled.span`
  position: absolute;
  right: 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.buttonBg};
  }
`;
