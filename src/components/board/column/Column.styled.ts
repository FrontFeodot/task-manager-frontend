import styled from 'styled-components';
import { MdDragIndicator } from 'react-icons/md';

import { Text } from '@components/text/TextCommon.styled';

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  position: relative;

  background-color: #202124;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  border-radius: 8px;

  width: 100%;
  height: fit-content;
`;

export const ColumnLabel = styled.div<{ hasItems: boolean }>`
  display: flex;
  padding: 16px 16px ${({ hasItems }) => (hasItems ? '16px' : '0')};
  align-items: center;
  justify-content: center;
`;

export const ColumnText = styled(Text)`
  font-size: 1.25rem;
  color: #8ab4f8;
`;

export const DnDAnchor = styled(MdDragIndicator)`
  position: absolute;
  align-self: flex-end;
  cursor: pointer;
`;
