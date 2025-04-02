import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { IButtonColor } from './StyledButton.types';
import { Text, TextInline } from '@components/text/TextCommon.styled';
import { MOBILE } from '@common/utils/mediaHelper';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Button = styled.button<{ $buttonColor: IButtonColor }>`
  ${(props) => props.theme.flexbox};

  width: 100%;
  background: ${({ $buttonColor }) => $buttonColor};
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
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
`;

export const ButtonLabel = styled(Text)`
  ${(props) => props.theme.flexbox};
  font-size: ${(props) => props.theme.fontMD};
  font-weight: bold;
  color: ${({ theme }) => theme.textButton};
`;
