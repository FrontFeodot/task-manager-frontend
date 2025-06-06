import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

export const TasksSectionWrapper = styled.div``;

export const TaskSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgTertiary};
  gap: 16px;
  min-height: 1px;
`;

export const TaskWrapper = styled.div``;

export const TaskTitle = styled(Text)``;

export const CreateNewTaskText = styled(Text)`
  align-self: center;
`;
