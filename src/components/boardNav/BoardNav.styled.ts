import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';
import { Text } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const BoardNavWrapper = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 16px 8px;

  background-color: #202124;

  transition: all 0.3s ease-in;

  @media (${TABLET_DESKTOP}) {
    position: relative;
    width: ${({ $isExpanded }) => ($isExpanded ? '20%' : '80px')};
    min-width: ${({ $isExpanded }) => ($isExpanded ? '248px' : '80px')};
    border-right: 4px solid #000000;
  }
  @media (${MOBILE}) {
    position: absolute;
    width: ${({ $isExpanded }) => ($isExpanded ? '100%' : '80px')};

    ${({ $isExpanded }) =>
      !$isExpanded ? 'border-right: 4px solid #000000' : ''};
    z-index: 100;
    height: calc(100% - 60px);
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
  background-color: #202124;
`;

export const CloseEditorWrapper = styled.div<{
  $isOpenedEditor: boolean;
  $isExpanded: boolean;
}>`
  ${(props) => props.theme.flexbox};

  cursor: pointer;
  background-color: #202124;

  display: ${({ $isExpanded }) => ($isExpanded ? 'block' : 'none')};

  width: ${({ $isOpenedEditor }) => ($isOpenedEditor ? '22px' : '0')};
  height: 30px;
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
  font-size: ${(props) => props.theme.fontMD};
`;

export const BoardSettingWrapper = styled.div`
  ${(props) => props.theme.flexbox};

  width: 24px;
  height: 100%;

  cursor: pointer;
`;
