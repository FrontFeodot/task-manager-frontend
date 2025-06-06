import Cookies from 'js-cookie';

import apiHandler from '@common/api/apiHandler';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { AUTH_TOKEN } from '@common/utils/cookies';
import {
  setLoginUser,
  setUserData,
  setUserLoading,
} from '@common/providers/userProvider/useUserState';
import { IPostLogin, IPostLoginResponse } from '@common/interfaces/IAuth';
import { resetBoardList } from '@common/providers/boardProvider/useBoardState';
import { IUserData } from '@common/providers/userProvider/types';

export const postLogin = async (
  payload: IPostLogin
): Promise<ICustomResponse<IPostLoginResponse | undefined>> => {
  try {
    setUserLoading(true);
    const response = await apiHandler<IPostLoginResponse, IPostLogin>({
      method: IApiMethod.POST,
      url: ApiCalls.AUTH,
      payload,
    });

    if (response?.isError || !response?.payload?.token) {
      throw response;
    }
    Cookies.set(AUTH_TOKEN, response.payload.token, {
      expires: 7,
    });
    setUserData(response.payload);
    setUserLoading(false);
    return response as ICustomResponse<IPostLoginResponse>;
  } catch (err) {
    setUserLoading(false);
    return err as ICustomResponse;
  }
};

export const getProtected = async (): Promise<void> => {
  const token = Cookies.get(AUTH_TOKEN);

  if (!token) {
    return setUserLoading(false);
  }
  try {
    const response = await apiHandler<IUserData, { token: string }>({
      method: IApiMethod.POST,
      url: ApiCalls.PROTECTED,
      payload: {
        token,
      },
    });
    if (response instanceof Error || response.isError) {
      throw response;
    }
    if (response.isSuccess && response.payload) {
      setLoginUser(true);
      setUserData(response.payload);
      setUserLoading(false);
    }
  } catch {
    logout();
    setUserLoading(false);
    return;
  }
};

export const logout = (): void => {
  setLoginUser(false);
  setUserData(null);
  resetBoardList();
  Cookies.remove(AUTH_TOKEN);
};
