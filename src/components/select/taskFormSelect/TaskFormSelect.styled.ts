import styled from 'styled-components';

import { TextInline } from '@components/text/TextCommon.styled';

export const TaskFormSelectWrapper = styled.div<{ $isEditField: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;

  gap: 4px;

  cursor: pointer;

  ${({ $isEditField }) =>
    !$isEditField
      ? `
    &:hover {
      color: #00bfa6;
    }
  `
      : ''}
`;

export const TaskFormSelectLabel = styled(TextInline)`
  font-size: 0.875rem;
  color: #a0a0a0;
`;

export const TaskFormSelectValue = styled(TextInline)`
  margin-left: 12px;
`;
