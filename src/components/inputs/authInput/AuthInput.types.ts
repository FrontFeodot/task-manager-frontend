import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  config?: UseFormRegisterReturn<string>;
}
