import Cookies from 'js-cookie';

import apiHandler from '@common/api/apiHandler';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { IPostRegister, IPostRegisterResponse } from '@common/interfaces/IAuth';
import {
  setUserData,
  setUserLoading,
} from '@common/providers/userProvider/useUserState';
import { AUTH_TOKEN } from '@common/utils/cookies';

const postRegister = async (
  payload: IPostRegister
): Promise<void | ICustomResponse<IPostRegisterResponse>> => {
  setUserLoading(true);
  try {
    const response = await apiHandler<Record<string, string>, IPostRegister>({
      method: IApiMethod.POST,
      url: ApiCalls.REGISTER,
      payload,
    });
    if (response.isError || !response.payload) {
      throw response;
    }
    Cookies.set(AUTH_TOKEN, response.payload.token, {
      expires: 24 * 3600 * 1000, // expired time
    });
    setUserData({ email: payload.email });
    setUserLoading(false);
  } catch (error) {
    setUserLoading(false);
    return error as ICustomResponse<IPostRegisterResponse>;
  }
};

export default postRegister;
