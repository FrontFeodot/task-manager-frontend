import { MOBILE, TABLET_DESKTOP } from '@common/utils/mediaHelper';
import { Text } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const BoardEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #202124;
  width: 100%;
  height: 100%;
  padding: 16px 0 24px;

  @media (${MOBILE}) {
    min-height: 100%;
    overflow: auto;
  }
`;

export const BoardEditorFieldsList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 0;
  gap: 36px;

  @media (${TABLET_DESKTOP}) {
    height: 100%;
  }
`;

export const TitleWrapper = styled.div``;

export const ColumnList = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  gap: 16px;
`;

export const FieldLabel = styled(Text)<{ $isTitle?: boolean }>`
  font-size: ${(props) => props.theme.fontSM};
  color: #a0a0a0;

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
  border: 1px solid #3a3b3c;
  justify-content: center;

  background: linear-gradient(145deg, #202124, #2a2b2e);
  cursor: pointer;
`;

export const CreatedAtBoard = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${(props) => props.theme.collapsedText};

  margin-bottom: 16px;
  min-height: 30px;
`;

export const DeleteBoardButton = styled.div`
  width: 100%;
  min-height: 36px;
  margin-bottom: 24px;
`;
