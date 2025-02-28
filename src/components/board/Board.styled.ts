import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 200px;
  width: auto;
  gap: 16px;
  padding: 16px 16px 0;
  background-color: #18191a;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;

  background-color: #202124;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  border-radius: 8px;

  width: 100%;
  height: fit-content;
`;

export const ColumnLabel = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const ColumnText = styled(Text)`
  margin-bottom: 12px;
  font-size: 1.25rem;
  color: #8ab4f8;
`;

export const TaskText = styled.div`
  background-color: #303134;
  padding: 8px 12px;
  margin: 6px 0;
  border-radius: 4px;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    background-color: #404247;
  }
`;
