import styled from 'styled-components';

export const Wrapper = styled.div`
  ${(props) => props.theme.flexbox};
  height: auto;
`;

export const LoginContainer = styled.div`
  ${(props) => props.theme.flexbox};
  flex-direction: column;
  width: 700px;
  min-height: 540px;
  height: auto;
  background-color: ${(props) => props.theme.bgTertiary};
`;
