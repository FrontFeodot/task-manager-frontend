import { ButtonHTMLAttributes } from 'react';

export interface IStyledButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}
