import { MOBILE } from '@common/utils/mediaHelper';
import styled, { keyframes } from 'styled-components';

export const LoaderWrapper = styled.div<{
  $isTransparent: boolean;
  $isRelative: boolean;
}>`
  position: ${({ $isRelative }) => ($isRelative ? 'relative' : 'absolute')};
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;

  ${(props) => props.theme.flexbox};
  width: 100%;
  height: 100%;
  background-color: rgba(
    24,
    25,
    26,
    ${({ $isTransparent }) => ($isTransparent ? '0.6' : '1')}
  );
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoaderSpinner = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid ${({ theme }) => theme.bgTertiary};
  border-radius: 50%;
  border-top: 4px solid ${({ theme }) => theme.buttonBg};
  animation: ${spin} 1s linear infinite;

  @media (${MOBILE}) {
    width: 50px;
    height: 50px;
  }
`;
