import { Text } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const BoardNavWrapper = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  width: ${({ $isExpanded }) => ($isExpanded ? '20%' : '40px')};
  height: 100%;

  background-color: #202124;
  border-right: 4px solid #000000;

  padding: 16px 8px;
`;

export const ToggleNavViewWrapper = styled.div`
  position: absolute;
  ${(props) => props.theme.flexbox};

  align-self: flex-end;
  cursor: pointer;

  width: 22px;
  height: 30px;
`;

export const BoardNavLabel = styled(Text)`
  ${(props) => props.theme.flexbox};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.25rem;
  height: 30px;
`;

export const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
`;

export const BoardListItem = styled.div<{ $isCreateLabel?: boolean }>`
  display: flex;
  flex-direction: row;

  padding: 8px;
  border-radius: 4px;
  border: 1px solid #3a3b3c;
  justify-content: ${({ $isCreateLabel }) =>
    $isCreateLabel ? 'center' : 'space-between'};

  background: linear-gradient(145deg, #202124, #2a2b2e);
  cursor: pointer;
`;

export const ListItemLabel = styled(Text)`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;
`;

export const BoardSettingWrapper = styled.div`
  ${(props) => props.theme.flexbox};

  width: 24px;
  height: 100%;

  cursor: pointer;
`;
