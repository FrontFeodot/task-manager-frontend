import styled, { DefaultTheme } from 'styled-components';

import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';
import { Text, TextInline } from '@components/text/TextCommon.styled';

export const BoardEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgTertiary};
  width: 100%;
  height: 100%;
  padding: 16px 0 24px;
  overflow-y: auto;

  @media (${MOBILE}) {
    min-height: 100%;
    overflow: auto;
  }
`;

export const BoardEditorFieldsList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 8px;
  gap: 36px;

  @media (${TABLET_DESKTOP}) {
    height: 100%;
  }
`;

export const TitleWrapper = styled.div``;

export const DoneColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 48px;
  padding: 8px 0;

  color: ${(props) => props.theme.textPrimary};

  border-top: ${(props) => props.theme.borderCommon};
  border-bottom: ${(props) => props.theme.borderCommon};

  & .button_label {
    font-size: ${(props) => props.theme.fontSM};
  }
`;

export const DoneColumnContent = styled(TextInline)``;

export const SelectDoneColumnButton = styled.div`
  width: 106px;
  height: 100%;
`;

const getSelectModeStyles = (theme: DefaultTheme): string => `
  .settings-column-item {
    box-shadow: 0 0 10px 2px ${theme.textSecondary};
    cursor: pointer;
  }
  .settings-column-item:hover {
    box-shadow: 0 0 10px 6px ${theme.textSecondary};
  }
`;

export const ColumnList = styled.div<{
  $isSelectModeActive: boolean;
  $doneColumn: string | null;
}>`
  display: flex;
  flex-direction: column;
  height: auto;
  gap: 16px;

  .settings-column-item[data-value=${(props) => props.$doneColumn}] {
    box-shadow: 0 0 10px 2px ${(props) => props.theme.textSecondary};
  }

  ${({ $isSelectModeActive, theme }) =>
    $isSelectModeActive ? getSelectModeStyles(theme) : ''};
`;

export const FieldLabel = styled(Text)<{ $isTitle?: boolean }>`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};

  ${({ $isTitle }) => ($isTitle ? 'margin-bottom: 16px' : '')};
`;

export const FormItemLabel = styled(Text)`
  color: ${(props) => props.theme.textPrimary};
`;

export const CreateNewColumn = styled.div`
  ${(props) => props.theme.flexbox};
  flex-direction: row;

  padding: 8px;
  border-radius: 4px;
  border: ${(props) => props.theme.borderCommon};
  justify-content: center;

  background: ${(props) => props.theme.bgGradient};
  cursor: pointer;
`;

export const CreatedAtBoard = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${(props) => props.theme.collapsedText};

  margin: 8px 8px 16px;
  min-height: 30px;
`;

export const BoardMembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  border: ${(props) => props.theme.borderCommon};
  margin: 8px;
  padding: 8px;
`;

export const MemberListTitle = styled(Text)`
  width: 100%;
  text-align: center;
  font-size: ${(props) => props.theme.fontLG};
  margin-bottom: 16px;
`;

export const MemberlistItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.bgGradient};
  padding: 8px;
  height: 40px;

  & .button_wrapper {
    min-width: 120px;
    max-width: 120px;
  }
`;

export const MemberListEmail = styled(Text)`
  font-size: ${(props) => props.theme.fontMD};
  ${(props) => props.theme.collapsedText};
`;

export const KickMemberButton = styled.div`
  width: 160px;
  min-height: 24px;
`;

export const BoardOwnerField = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 16px 8px;
`;

export const DeleteBoardButton = styled.div`
  width: 100%;
  min-height: 36px;
  margin: 0;
`;

export const ResultContainer = styled(Text)<{ $isSuccess: boolean }>`
  position: absolute;
  bottom: 0;
  ${(props) => props.theme.flexbox};
  align-self: center;
  justify-content: flex-start;
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;

  background-color: ${({ $isSuccess, theme }) =>
    $isSuccess ? theme.successBg : theme.errorBg};
  color: ${(props) => props.theme.errorText};
  box-sizing: border-box;
`;
