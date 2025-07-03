import styled from 'styled-components';

import Icon from '@common/icons/Icon';
import { TABLET } from '@common/utils/mediaHelper';

import { Text } from '@components/text/TextCommon.styled';

export const ColumnWrapper = styled.div<{ $isDone: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  position: relative;

  min-width: 196px;

  background-color: ${(props) => props.theme.bgTertiary};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.textPrimary};
  border-radius: 8px;

  width: 100%;
  height: fit-content;

  box-shadow: ${({ $isDone }) =>
    $isDone ? '0 0 10px 2px #8ab4f8' : '0 0 8px 1px #3a3b3c'};
`;

export const ColumnLabel = styled.div`
  display: flex;
  padding: 24px 0px 8px;
  align-items: center;
  justify-content: center;
  height: auto;

  word-break: break-word;
`;

export const ColumnText = styled(Text)<{ $isCreateColumn?: boolean }>`
  font-size: ${(props) => props.theme.fontXL};
  color: ${(props) => props.theme.textSecondary};

  text-align: center;
  ${({ $isCreateColumn }) => ($isCreateColumn ? 'cursor: pointer' : '')};

  @media (${TABLET}) {
    font-size: ${(props) => props.theme.fontLG};
  }
`;

export const DnDAnchor = styled(Icon)`
  position: absolute;
  align-self: flex-end;
  cursor: pointer;
`;
