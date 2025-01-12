import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 540px;
  padding: 40px 0;
  min-height: 540px;
  height: 100%;

  background-color: ${(props) => props.theme.bgTertiary};
`;
