import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.bgSecondary};
  color: ${(props) => props.theme.textPrimary};
  border: 1px solid ${(props) => props.theme.textAccent};
  padding: 10px 14px;
  font-size: 16px;
  outline: none;
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
