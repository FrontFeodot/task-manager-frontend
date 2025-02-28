import Cookies from 'js-cookie';

import apiHandler from '@common/api/apiHandler';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from 'common/interfaces/IApiHandler';
import { IPostRegister, IPostRegisterResponse } from 'common/interfaces/IAuth';
import { AUTH_TOKEN } from '@common/utils/cookies';

const postRegister = async ({
  email,
  password,
  confirmPassword,
}: IPostRegister): Promise<void | ICustomResponse<IPostRegisterResponse>> => {
  try {
    const response = await apiHandler<Record<string, string>>({
      method: IApiMethod.POST,
      url: ApiCalls.REGISTER,
      payload: {
        email,
        password,
        confirmPassword,
      },
    });
    if (response.isError || !response.payload) {
      throw response;
    }
    Cookies.set(AUTH_TOKEN, response.payload.token, {
      expires: 24 * 3600 * 1000, // expired time
    });
  } catch (error) {
    console.error(error);
    return error as ICustomResponse<IPostRegisterResponse>;
  }
};

export default postRegister;
