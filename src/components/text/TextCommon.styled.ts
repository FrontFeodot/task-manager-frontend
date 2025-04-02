import styled from 'styled-components';

export const Text = styled.p`
  font-size: ${(props) => props.theme.fontSM};
  margin: 0;
  color: ${(props) => props.theme.textPrimary};
`;

export const TextInline = styled.span``;
