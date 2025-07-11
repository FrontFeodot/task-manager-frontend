import styled, { keyframes } from 'styled-components';

import { MOBILE } from '@common/utils/mediaHelper';

import { Text } from '@components/text/TextCommon.styled';

export const LoaderWrapper = styled.div<{
  $isTransparent: boolean;
  $isRelative: boolean;
  $isAppLoading: boolean;
}>`
  position: ${({ $isRelative }) => ($isRelative ? 'relative' : 'absolute')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;

  ${(props) => props.theme.flexbox};
  flex-direction: column;
  width: 100%;
  height: calc(100% - ${({ $isAppLoading }) => ($isAppLoading ? 60 : 0)}px);
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

export const LoaderSpinner = styled.div<{ $size: 'sm' | 'lg' }>`
  width: ${({ $size }) => ($size === 'lg' ? 80 : 30)}px;
  height: ${({ $size }) => ($size === 'lg' ? 80 : 30)}px;
  border: 4px solid ${({ theme }) => theme.bgTertiary};
  border-radius: 50%;
  border-top: 4px solid ${({ theme }) => theme.buttonBg};
  animation: ${spin} 1s linear infinite;

  @media (${MOBILE}) {
    width: 50px;
    height: 50px;
  }
`;

export const LoaderText = styled(Text)`
  margin: 40px 16px 0;
  font-size: ${(props) => props.theme.fontLG};
`;
