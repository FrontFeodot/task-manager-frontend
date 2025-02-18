import Cookies from 'js-cookie';

import { ApiCalls, IApiMethod } from '@common/interfaces/IApiHandler';
import { AUTH_TOKEN } from '@common/utils/cookies';

import apiHandler from './apiHandler';
import CustomError from './error';
import { setLoginUser } from '@common/providers/userProvider/useUserState';
import { IPostLogin } from '@common/interfaces/IAuth';

// TODO: separate login to helpers

export const postLogin = async ({
  email,
  password,
}: IPostLogin): Promise<CustomError | void> => {
  try {
    const response = await apiHandler<Record<string, string>>({
      method: IApiMethod.POST,
      url: ApiCalls.AUTH,
      payload: {
        email,
        password,
      },
    });
    if (response instanceof CustomError) {
      throw response;
    }
    Cookies.set(AUTH_TOKEN, response.token, {
      expires: 24 * 3600 * 1000, // expired time
    });
  } catch (err) {
    console.error(`Auth error: `, err);
    return err as CustomError;
  }
};

export const getProtected = async (): Promise<void | CustomError> => {
  const token = Cookies.get(AUTH_TOKEN);
  if (token) {
    try {
      const response = await apiHandler<Record<string, string>>({
        method: IApiMethod.POST,
        url: ApiCalls.PROTECTED,
        payload: {
          token,
        },
      });
      if (response instanceof CustomError) {
        throw response;
      }
      if (response.success) {
        setLoginUser(true);
      }
    } catch (err) {
      return err as CustomError;
    }
  }
};

export const logout = (): void => {
  setLoginUser(false);
  Cookies.remove(AUTH_TOKEN);
};
