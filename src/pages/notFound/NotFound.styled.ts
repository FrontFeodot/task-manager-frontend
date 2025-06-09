import { Text, TextInline } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
  ${(props) => props.theme.flexbox};
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgTertiary};
`;

export const NotFoundLabel = styled(Text)`
  color: ${(props) => props.theme.textPrimary};
  font-size: ${(props) => props.theme.fontH1};
`;

export const GoHomePage = styled(TextInline)`
  font-size: ${(props) => props.theme.fontH1};

  color: ${(props) => props.theme.link};
  cursor: pointer;
`;
