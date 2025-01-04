import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgPrimary};

  p {
    font-size: 0.875rem;
    margin: 0;
    color: ${(props) => props.theme.textPrimary};
  }
`;
