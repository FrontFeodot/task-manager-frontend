import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';
import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';

export const BoardWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  padding: 16px 16px 0;
  background-color: #18191a;

  overflow-x: auto;

  @media (${TABLET_DESKTOP}) {
    flex-direction: row;
    border-right: 4px solid #000000;
    margin-right: 16px;
  }

  @media (${MOBILE}) {
    margin-left: 80px;
    flex-direction: column;
    padding-bottom: 48px;
  }
`;

export const ColumnLabel = styled.div<{ $hasItems: boolean }>`
  display: flex;
  padding: 16px 16px ${({ $hasItems }) => ($hasItems ? '16px' : '0')};
  align-items: center;
  justify-content: center;
`;

export const ColumnText = styled(Text)`
  font-size: ${(props) => props.theme.fontXL};
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
