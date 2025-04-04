import { TaskFlexBoxView, TaskGridView } from '@common/utils/mediaHelper';
import { TextInline } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

const calcGridWidth = (value: string): string => `calc(${value} - 8px)`;

export const TaskFormWrapper = styled.form`
  background-color: ${(props) => props.theme.modalBg};

  border-radius: 16px;
  color: ${(props) => props.theme.textPrimary};
  display: grid;
  grid-template-areas:
    'top-left top-right'
    'bottom bottom';
  grid-template-columns: ${calcGridWidth('60%')} ${calcGridWidth('40%')};
  grid-template-rows: ${calcGridWidth('90%')} ${calcGridWidth('10%')};

  gap: 16px;
  max-width: 100%;
  max-height: 100%;

  min-height: 500px;

  height: 100%;

  box-sizing: border-box;

  @media (${TaskFlexBoxView}) {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
`;
export const LayoutItem = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.bgPrimary};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  height: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;

  &:not(:last-child) > div {
    background-color: ${(props) => props.theme.inputBg};
    border: ${(props) => props.theme.borderCommon};
    padding: 16px;
  }

  &:last-child button {
    font-size: ${(props) => props.theme.fontSM};
    padding: inherit;
  }
`;

export const TopLeft = styled(LayoutItem)`
  grid-area: top-left;

  .input-title {
    display: flex;
    align-items: center;
    height: 36px;
  }

  @media (${TaskGridView}) {
    & :last-child {
      height: 100%;
    }
  }

  @media (${TaskFlexBoxView}) {
    height: auto;
  }
`;

export const TaskSummary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const MetaInfoRow = styled(TextInline)`
  font-size: ${(props) => props.theme.fontXS};
  color: ${(props) => props.theme.textDisabled};
  width: max-content;
`;

export const TopRight = styled(LayoutItem)`
  grid-area: top-right;
`;

export const Bottom = styled(LayoutItem)`
  grid-area: bottom;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  min-height: 48px;

  @media (${TaskFlexBoxView}) {
    height: auto;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  max-width: 124px;
  min-height: 24px;
  max-height: 36px;
  width: 100%;
  height: 100%;
`;
