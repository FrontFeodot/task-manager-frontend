import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { IButtonColor } from './StyledButton.types';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Button = styled.button<{ $buttonColor: IButtonColor }>`
  width: 100%;
  background: ${({ $buttonColor }) => $buttonColor};
  color: ${({ theme }) => theme.textButton};
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

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
`;
