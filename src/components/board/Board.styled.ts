import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 200px;
  width: auto;
  gap: 16px;
  padding: 16px 16px 0;
  background-color: #18191a;
`;

export const ColumnLabel = styled.div<{ $hasItems: boolean }>`
  display: flex;
  padding: 16px 16px ${({ $hasItems }) => ($hasItems ? '16px' : '0')};
  align-items: center;
  justify-content: center;
`;

export const ColumnText = styled(Text)`
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
