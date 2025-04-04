import styled from 'styled-components';

import { TextInline } from '@components/text/TextCommon.styled';

export const TaskFormSelectWrapper = styled.div<{ $isEditField: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;

  gap: 4px;

  cursor: pointer;

  ${({ $isEditField, theme }) =>
    !$isEditField
      ? `
    &:hover {
      color: ${theme.successColor};
    }
  `
      : ''}
`;

export const TaskFormSelectLabel = styled(TextInline)`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};
`;

export const TaskFormSelectValue = styled(TextInline)`
  font-size: ${(props) => props.theme.fontMD};
  margin-left: 12px;
`;
