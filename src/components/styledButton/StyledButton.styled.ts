import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { ITheme } from '@theme/theme';

import { Text } from '@components/text/TextCommon.styled';

import { IButtonColor } from './StyledButton.types';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const getDisabledButtonStyles = (theme: ITheme) => `
  background-color: ${theme.buttonDisabledBg};
  color: ${theme.buttonDisabledText};
  border-color: ${theme.buttonDisabledBorderColor};
  cursor: auto;

  &:hover {
    background-color: ${theme.buttonDisabledBg};
    color: ${theme.buttonDisabledText};
    border-color: ${theme.buttonDisabledBorderColor};
  }
`;

const getLoadingButtonStyles = () => `
  padding: 0;
`;

export const Button = styled.button<{
  $buttonColor: IButtonColor;
  $isLoading: boolean;
  disabled?: boolean;
}>`
  ${(props) => props.theme.flexbox};

  width: 100%;
  background: ${({ $buttonColor }) => $buttonColor};
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.3s ease;
  gap: 4px;

  ${({ theme }) => theme.shadow};

  &:hover {
    background: ${({ $buttonColor }) => lighten(0.1, $buttonColor)};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px ${({ $buttonColor }) => $buttonColor};
  }

  &:active {
    transform: scale(0.95);
    background: ${({ $buttonColor }) => darken(0.1, $buttonColor)};
  }

  ${({ disabled, theme }) => (disabled ? getDisabledButtonStyles(theme) : '')}
  ${({ $isLoading }) => ($isLoading ? getLoadingButtonStyles() : '')}
`;

export const ButtonLabel = styled(Text)`
  ${(props) => props.theme.flexbox};
  font-size: ${(props) => props.theme.fontMD};
  font-weight: bold;
  color: ${({ theme }) => theme.textButton};
`;
