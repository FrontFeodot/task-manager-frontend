import { ButtonHTMLAttributes } from 'react';

export enum IButtonColor {
  RED = '#FF4D4F',
  GREEN = '#24a352',
  default = '#9B51E0',
}

export interface IStyledButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  buttonColor?: IButtonColor;
  className?: string;
  Icon?: JSX.Element;
}
