import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.buttonBg};
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
    background: ${({ theme }) => lighten(0.1, theme.buttonBg)};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px ${({ theme }) => theme.link};
  }

  &:active {
    transform: scale(0.95);
    background: ${({ theme }) => darken(0.1, theme.buttonBg)};
  }
`;
