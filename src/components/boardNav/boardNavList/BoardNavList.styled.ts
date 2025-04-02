import { MOBILE } from '@common/utils/mediaHelper';
import { Text } from '@components/text/TextCommon.styled';
import styled, { DefaultTheme } from 'styled-components';

export const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
`;

const selectedStyles = (theme: DefaultTheme): string => `
  background: ${theme.bgTertiary};
    border-left: 4px solid ${theme.buttonBg};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

export const BoardListItem = styled.div<{
  $isExpanded: boolean;
  $isCreateLabel?: boolean;
  $isSelected?: boolean;
}>`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  width: auto;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #3a3b3c;
  justify-content: ${({ $isCreateLabel }) =>
    $isCreateLabel ? 'center' : 'space-between'};

  background: linear-gradient(145deg, #202124, #2a2b2e);
  cursor: pointer;
  transition: all 0.3s ease-in;
  ${({ $isSelected, theme }) => ($isSelected ? selectedStyles(theme) : '')}
`;

export const ListItemLabel = styled(Text)<{ $isExpanded: boolean }>`
  width: 100%;

  color: ${({ theme }) => theme.textPrimary};
  font-size: ${(props) => props.theme.fontMD};

  ${({ theme, $isExpanded }) => ($isExpanded ? theme.collapsedText : '')};

  transition: all 0.3s ease-in;

  & span {
    ${({ $isExpanded }) => ($isExpanded ? 'padding-right: 24px;' : '')};
  }

  &:has(.create-board-button) {
    ${(props) => props.theme.flexbox};
  }
`;

export const BoardSettingWrapper = styled.div`
  ${(props) => props.theme.flexbox};

  width: 24px;
  height: 100%;

  cursor: pointer;
`;
