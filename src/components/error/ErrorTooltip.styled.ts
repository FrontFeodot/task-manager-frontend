import styled from 'styled-components';

const ErrorTooltip = styled.div<{ $isGlobal?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.errorBg};
  color: ${({ theme }) => theme.errorText};
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  font-size: ${(props) => props.theme.fontSM};

  white-space: nowrap;
  width: ${({ $isGlobal }) => ($isGlobal ? '100%' : 'auto')};
  transition: all ease-in 1s;

  & p {
    color: ${({ theme }) => theme.errorText};
  }
  opacity: 1;
  transform: translateY(10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  & p,
  li {
    white-space: pre-wrap;
  }
`;

export default ErrorTooltip;
