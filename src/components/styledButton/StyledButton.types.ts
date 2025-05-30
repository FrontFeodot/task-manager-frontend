import { ButtonHTMLAttributes } from 'react';

export enum IButtonColor {
  RED = '#FF4D4F',
  GREEN = '#24a352',
  GREY = '#252627',
  default = '#9B51E0',
}

export interface IStyledButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  buttonColor?: IButtonColor;
  className?: string;
  isLoading?: boolean;
  Icon?: JSX.Element;
}
