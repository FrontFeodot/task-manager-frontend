import styled from 'styled-components';

import { TextInline } from '@components/text/TextCommon.styled';

export const TaskFormSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  gap: 4px;

  cursor: pointer;
`;

export const TaskFormSelectLabel = styled(TextInline)`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};
`;
