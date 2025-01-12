import { IPostRegister } from 'common/interfaces/IAuth';
import { emailRegex, passwordRegex } from 'common/utils/regex';
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

export const getEmailConfig = (
  register: UseFormRegister<IPostRegister>,
  clearErrors: any /* , onChange: (e: React.FormEvent<HTMLInputElement>) => void */
) => {
  return register('email', {
    required: 'Email is required',
    pattern: {
      value: emailRegex,
      message: `
              <p>A valid email address must meet the following criteria:</p>
              <ul>
          <li>Starts with letters, numbers, or special characters (., _, %, +, -)</li>
          <li>Contains an "@" symbol</li>
          <li>Includes a domain name (e.g., gmail, yahoo)</li>
          <li>Ends with a valid domain suffix (e.g., .com, .org, .net)</li>
          </ul>
              `,
    },
    onChange: () => {
      clearErrors();
    },
  });
};
export const getPasswordConfig = (
  register: UseFormRegister<IPostRegister> /* , onChange: (e: React.FormEvent<HTMLInputElement>) => void */
) => {
  return register('password', {
    required: 'Password is required',
    pattern: {
      value: passwordRegex,
      message: `<p>Your password must meet the following criteria:</p>
              <ul>
<li>At least 8 characters long</li>
<li>Contains at least one uppercase letter (A-Z)</li>
<li>Contains at least one number (0-9)</li>
<li>Contains at least one special character (@, $, !, %, *, ?, &)</li>
</ul>
`,
    },
  });
};
export const getConfirmPasswordConfig = (
  register: UseFormRegister<IPostRegister>,
  getValues: UseFormGetValues<IPostRegister> /* , onChange: (e: React.FormEvent<HTMLInputElement>) => void */
) => {
  return register('confirmPassword', {
    required: 'Please confirm your password',
    validate: (value) =>
      value === getValues('password') || 'Passwords do not match',
  });
};
