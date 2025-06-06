import { Text } from '@components/text/TextCommon.styled';
import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
  ${(props) => props.theme.flexbox};

  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgTertiary};
`;

export const NotFoundLabel = styled(Text)`
  color: ${(props) => props.theme.textPrimary};
`;
