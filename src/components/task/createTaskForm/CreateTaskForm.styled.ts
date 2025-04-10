import styled from 'styled-components';

export const DetailsContainer = styled.div``;

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow: auto;

  background-color: ${(props) => props.theme.bgPrimary};
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.textPrimary};
`;

export const FormItem = styled.div`
  width: 100%;
  height: auto;
`;

export const Button = styled.button`
  color: ${(props) => props.theme.textPrimary};
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  min-height: 36px;

  & > div {
    height: auto;
  }
`;
