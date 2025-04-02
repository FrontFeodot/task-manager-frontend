import { Text, TextInline } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const EmptyLayoutWrapper = styled.div`
  ${(props) => props.theme.flexbox};

  width: 100%;
  height: 100%;

  background: linear-gradient(145deg, #2a2b2e, #202124);
  text-transform: uppercase;
`;

export const EmptyLayoutLabel = styled(Text)`
  font-size: ${(props) => props.theme.fontXL};
  color: ${(props) => props.theme.textPrimary};
`;

export const CreateBoardLink = styled(TextInline)`
  color: ${(props) => props.theme.link};
  cursor: pointer;
`;
