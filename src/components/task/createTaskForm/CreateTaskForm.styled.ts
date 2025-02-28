import { Text } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const DetailsContainer = styled.div`
  background-color: #18191a;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  color: #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;

export const FormItem = styled.div`
  width: 100%;
  height: auto;
`;

export const Button = styled.button`
  color: #f0f0f0;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
  &:hover {
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const LayoutItem = styled.div`
  padding: 20px;
  border-radius: 16px;

  background-color: #18191a;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

export const TopLeft = styled(LayoutItem)``;
export const TopRight = styled(LayoutItem)``;
export const Bottom = styled(LayoutItem)``;
