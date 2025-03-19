import { Text, TextInline } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

const calcGridWidth = (value: string): string => `calc(${value} - 8px)`;

export const TaskFormWrapper = styled.form`
  background-color: #2f303d;

  border-radius: 16px;
  color: #f0f0f0;
  display: grid;
  grid-template-areas:
    'top-left top-right'
    'bottom bottom';
  grid-template-columns: ${calcGridWidth('60%')} ${calcGridWidth('40%')};
  grid-template-rows: ${calcGridWidth('90%')} ${calcGridWidth('9%')};
  gap: 16px;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  min-height: 500px;

  box-sizing: border-box;
`;
export const LayoutItem = styled.div`
  padding: 20px;
  border-radius: 16px;
  background-color: #18191a;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  height: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;

  &:not(:last-child) > div {
    background-color: #252627;
    border: 1px solid #3a3b3c;
    padding: 16px;
  }

  &:last-child button {
    font-size: 0.875rem;
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
`;
export const TopRight = styled(LayoutItem)`
  grid-area: top-right;
`;

export const Bottom = styled(LayoutItem)`
  grid-area: bottom;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomRightSection = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 100%;
  padding-right: 8px;
  gap: 16px;
`

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
  height: 100%;
  margin-right: 16px;
`;
export const MetaInfoRow = styled(TextInline)`
  font-size: 0.75rem;
  color: #a0a0a0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 124px;
  height: 100%;
`;

export const TaskSummary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  border-bottom: 1px solid #3a3b3c;
  padding: 8px 16px;

  & .select-title {
    color: #a0a0a0;
  }
`;

export const TaskSummaryContent = styled(TextInline)`
  font-size: 0.875rem;
  color: #a0a0a0;
`;
