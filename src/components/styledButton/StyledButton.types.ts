import { ButtonHTMLAttributes } from 'react';

export enum IButtonColor {
  RED = '#FF4D4F',
  default = '#9B51E0'
}

export interface IStyledButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  buttonColor?: IButtonColor
}
