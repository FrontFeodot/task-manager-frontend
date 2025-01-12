import Cookies from 'js-cookie';

import { IApiMethod } from 'common/interfaces/IApiHandler';

import apiHandler from './apiHandler';
import CustomError from './error';

export const auth = async (
  email: string,
  password: string
): Promise<CustomError | void> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.POST,
      url: '/auth/login',
      payload: {
        email,
        password,
      },
    });
    if (response instanceof CustomError) {
      throw response;
    }
    if (response.token) {
      console.log('auth success');
      Cookies.set('authToken', response.token, {
        expires: 24 * 3600 * 1000, // expired time
      });
    }
  } catch (err) {
    console.error(`Auth error: `, err);
    return err as CustomError;
  }
};
