import { Text, TextInline } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const EmptyLayoutWrapper = styled.div`
  ${(props) => props.theme.flexbox};

  width: 100%;
  height: 100%;

  background: ${(props) => props.theme.bgGradient};
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
