import { TaskFlexBoxView } from '@common/utils/mediaHelper';
import { TextInline } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const TaskFormWrapper = styled.form`
  background-color: ${(props) => props.theme.modalBg};
  border-radius: 16px;
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px;
  max-width: 100%;
  min-height: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  @media (${TaskFlexBoxView}) {
    overflow: auto;
    padding: 0;
  }
`;

export const LayoutItem = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.bgPrimary};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  gap: 16px;
  display: flex;
  flex-direction: column;

  &:not(.task-buttons-section) > div {
    background-color: ${(props) => props.theme.inputBg};
    border: ${(props) => props.theme.borderCommon};
    &:not(.mark-task-as-done) {
      padding: 16px;
    }
  }

  &:last-child button {
    font-size: ${(props) => props.theme.fontSM};
    padding: inherit;
  }
`;

export const TopLeft = styled(LayoutItem)`
  width: calc(60% - 8px);
  min-height: calc(100% - 72px - 16px); // height of bottom section + gap
  position: relative;

  .input-title {
    display: flex;
    align-items: center;
    height: 36px;
  }

  @media (${TaskFlexBoxView}) {
    width: 100%;
    height: auto;
  }
`;

export const TopRightScrollableContainer = styled.div`
  position: relative;
  height: auto;
  width: calc(40% - 8px);

  @media (${TaskFlexBoxView}) {
    width: 100%;
    height: auto;
  }
`;

export const TopRight = styled(LayoutItem)`
  position: sticky;
  width: 100%;
  height: auto;
  top: 0;
`;

export const Bottom = styled(LayoutItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 8px 16px;
  height: 72px;

  @media (${TaskFlexBoxView}) {
  }
`;

export const TaskSummary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  border-bottom: ${(props) => props.theme.borderCommon};
  padding: 8px 16px;

  & .select-title {
    color: ${(props) => props.theme.textDisabled};
  }

  @media (${TaskFlexBoxView}) {
    justify-content: space-between;
  }
`;

export const TaskSummaryContent = styled(TextInline)`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  gap: 16px;
`;

export const MetaInfoRow = styled(TextInline)`
  font-size: ${(props) => props.theme.fontXS};
  color: ${(props) => props.theme.textDisabled};
  width: max-content;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  max-width: 124px;
  min-height: 24px;
  max-height: 36px;
  width: 100%;
  height: 100%;
`;

export const MarkAsDoneWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 50px;
  padding: 8px 16px;
`;

export const MarkAsDoneContent = styled(TextInline)``;

export const MarkAsDoneButtonWrapper = styled.div`
  width: 128px;
  height: 100%;
`;
