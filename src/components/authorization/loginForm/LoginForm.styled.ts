import styled from 'styled-components';

export const Wrapper = styled.div`
  ${(props) => props.theme.flexbox};
  width: 540px;
  min-height: 540px;
  height: 100%;
  background-color: ${(props) => props.theme.bgTertiary};
`;
