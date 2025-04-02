import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;

  ${(props) => props.theme.flexbox};
  width: 100%;
  height: 100%;
  background-color: rgba(24, 25, 26, 0.8);
`;
