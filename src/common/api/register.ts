import Cookies from 'js-cookie';

import { IApiMethod } from 'common/interfaces/IApiHandler';
import apiHandler from './apiHandler';
import CustomError from './error';
import { IPostRegister } from 'common/interfaces/IAuth';
import { AUTH_TOKEN } from '@common/utils/cookies';

const postRegister = async ({
  email,
  password,
  confirmPassword,
}: IPostRegister): Promise<void | CustomError> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.POST,
      url: '/auth/signup',
      payload: {
        email,
        password,
        confirmPassword,
      },
    });
    if (response instanceof CustomError) {
      throw response;
    }
    console.log('registerSucces');
    Cookies.set(AUTH_TOKEN, response.token, {
      expires: 24 * 3600 * 1000, // expired time
    });
  } catch (error) {
    console.error(error);
    return error as CustomError;
  }
};

export default postRegister;
