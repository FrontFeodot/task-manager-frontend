import styled from 'styled-components';

export const ModalListWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
`;

export const ModalWrapper = styled.div<{ $index: number }>`
  position: absolute;
  ${(props) => props.theme.flexbox};
  width: 100%;
  height: 100%;
  background-color: rgba(24, 25, 26, 0.8);

  z-index: ${(props) => 101 + props.$index};
`;
