import styled from 'styled-components';

import { Text } from '@components/text/TextCommon.styled';
import { MOBILE } from '@common/utils/mediaHelper';

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
  ${(props) => props.theme.collapsedText};

  width: calc(100% - 26px);
  height: auto;

  font-size: ${(props) => props.theme.fontLG};

  @media (${MOBILE}) {
    font-size: ${(props) => props.theme.fontMD};
  }
`;
export const TaskDescription = styled(Text)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (${MOBILE}) {
    font-size: ${(props) => props.theme.fontSM};
  }
`;

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
