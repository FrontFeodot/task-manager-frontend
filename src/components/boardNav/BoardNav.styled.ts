import styled from 'styled-components';

import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';

import { Text } from '@components/text/TextCommon.styled';

export const BoardNavWrapper = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 16px 8px;

  background-color: ${(props) => props.theme.bgTertiary};
  border-right: 4px solid ${(props) => props.theme.bgSecondary};

  transition: all 0.3s ease-in;

  @media (${TABLET_DESKTOP}) {
    position: relative;
    width: ${({ $isExpanded }) => ($isExpanded ? '25%' : '80px')};
    min-width: ${({ $isExpanded }) => ($isExpanded ? '248px' : '80px')};
  }

  @media (${MOBILE}) {
    position: absolute;

    width: ${({ $isExpanded }) => ($isExpanded ? '100%' : '80px')};
    height: calc(100% - 60px);

    ${({ $isExpanded }) => ($isExpanded ? 'border-right: none' : '')};

    z-index: 100;
    overflow: hidden;
  }
`;

export const TopSection = styled.div<{ $isExpanded: boolean }>`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: ${({ $isExpanded }) =>
    $isExpanded ? 'space-between' : 'center'};

  width: 100%;
  min-height: 36px;
  background-color: ${(props) => props.theme.bgTertiary};

  color: ${({ theme }) => theme.iconColor};
`;

export const CloseEditorWrapper = styled.div<{
  $isOpenedEditor: boolean;
  $isExpanded: boolean;
}>`
  ${(props) => props.theme.flexbox};

  display: ${({ $isExpanded }) => ($isExpanded ? 'flex' : 'none')};

  width: ${({ $isOpenedEditor }) => ($isOpenedEditor ? '22px' : '0')};
  height: 30px;

  cursor: pointer;
  background-color: ${(props) => props.theme.bgTertiary};
  color: ${({ theme }) => theme.textPrimary};
`;

export const ToggleNavViewWrapper = styled.div<{ $isExpanded: boolean }>`
  ${(props) => props.theme.flexbox};

  cursor: pointer;
  width: 22px;
  height: 30px;
`;

export const BoardNavLabel = styled(Text)`
  ${(props) => props.theme.flexbox};
  ${(props) => props.theme.collapsedText};

  color: ${({ theme }) => theme.textPrimary};
  font-size: ${(props) => props.theme.fontXL};
  min-height: 30px;
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
  border: ${(props) => props.theme.borderCommon};
  justify-content: ${({ $isCreateLabel }) =>
    $isCreateLabel ? 'center' : 'space-between'};

  background: ${(props) => props.theme.bgGradient};
  cursor: pointer;
`;

export const ListItemLabel = styled(Text)`
  color: ${({ theme }) => theme.textPrimary};
  font-size: ${(props) => props.theme.fontMD};
`;

export const BoardSettingWrapper = styled.div`
  ${(props) => props.theme.flexbox};

  width: 24px;
  height: 100%;

  cursor: pointer;
`;
