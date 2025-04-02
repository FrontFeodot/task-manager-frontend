import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgPrimary};
  overflow: auto;

  & .navigation + div {
    margin-top: 60px;
  }
`;
