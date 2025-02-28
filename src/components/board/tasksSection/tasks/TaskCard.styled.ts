import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';

export const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  background: linear-gradient(145deg, #202124, #2a2b2e);
  border: 1px solid #3a3b3c;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const TaskTitle = styled(Text)`
  height: 16px;
  font-size: 1.125rem;
`;
export const TaskDescription = styled(Text)``;

export const TaskBottomSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const PriorityIconWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const CreateNewTaskText = styled(Text)`
  align-self: center;
`;
