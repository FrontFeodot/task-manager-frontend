import styled from 'styled-components';

export const AccessibilityWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 10px;

  ${(props) => props.theme.flexbox};
  width: 20px;
  cursor: pointer;

  &:hover {
    & svg {
      fill: ${(props) => props.theme.errorBg};
    }
  }
`;
