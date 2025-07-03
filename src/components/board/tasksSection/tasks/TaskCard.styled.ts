import styled from 'styled-components';

import { MOBILE } from '@common/utils/mediaHelper';

import { Text } from '@components/text/TextCommon.styled';

export const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  background: ${(props) => props.theme.bgGradient};
  border: ${(props) => props.theme.borderCommon};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const TaskCardTop = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const TaskCardId = styled(Text)`
  color: ${(props) => props.theme.textDisabled};
`;

export const TaskTitle = styled(Text)`
  ${(props) => props.theme.collapsedText};

  width: calc(100% - 26px);
  height: auto;

  font-size: ${(props) => props.theme.fontLG};

  padding-bottom: 8px;
  border-bottom: 2px solid ${(props) => props.theme.disabledBg};

  @media (${MOBILE}) {
    font-size: ${(props) => props.theme.fontMD};
  }
`;

export const Divider = styled.div`
  width: 90%;
  border: ${(props) => props.theme.borderCommon};
`;

export const TaskDescription = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  color: ${(props) => props.theme.textPrimary};

  & p,
  ul {
    margin: 0;
  }
  & img {
    width: 100% !important;
    height: 100% !important;
  }

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
