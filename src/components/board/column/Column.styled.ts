import styled from 'styled-components';
import { MdDragIndicator } from 'react-icons/md';

import { Text } from '@components/text/TextCommon.styled';
import { MOBILE, TABLET } from '@common/utils/mediaHelper';

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  position: relative;

  min-width: 196px;

  background-color: #202124;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  border-radius: 8px;

  width: 100%;
  height: fit-content;
`;

export const ColumnLabel = styled.div<{ $hasItems?: boolean }>`
  display: flex;
  padding: 8px ${({ $hasItems }) => ($hasItems ? '8px' : '0')};
  align-items: center;
  justify-content: center;
`;

export const ColumnText = styled(Text)<{ $isCreateColumn?: boolean }>`
  font-size: ${(props) => props.theme.fontXL};
  color: #8ab4f8;

  text-align: ${({ $isCreateColumn }) => ($isCreateColumn ? 'center' : 'left')};
  ${({ $isCreateColumn }) => ($isCreateColumn ? 'cursor: pointer' : '')};

  @media (${TABLET}) {
    font-size: ${(props) => props.theme.fontLG};
  }
`;

export const DnDAnchor = styled(MdDragIndicator)`
  position: absolute;
  align-self: flex-end;
  cursor: pointer;
`;
