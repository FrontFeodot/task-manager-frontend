import { InputHTMLAttributes } from 'react';

export interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  config?: any;
}
