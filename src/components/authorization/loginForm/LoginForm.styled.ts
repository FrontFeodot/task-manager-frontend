import styled from 'styled-components';

import {lighten, darken} from 'polished'

export const Wrapper = styled.div`
  width: 540px;
  height: 360px;
  background-color: ${(props) => props.theme.bgTertiary};
`;

export const LoginForm = styled.form`
  ${props => props.theme.flexbox};
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 40px;
`;

export const FormItem = styled.div`
  width: 100%;
`;

export const LoginSubmit = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.textButton};
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
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
