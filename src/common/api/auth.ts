import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

import apiHandler from '@common/api/apiHandler';
import {
  ApiCalls,
  IApiMethod,
  ICustomResponse,
} from '@common/interfaces/IApiHandler';
import { AUTH_TOKEN } from '@common/utils/cookies';
import {
  setLoginUser,
  setUserLoading,
} from '@common/providers/userProvider/useUserState';
import { IPostLogin } from '@common/interfaces/IAuth';
import {
  resetBoardList,
  setBoardsList,
} from '@common/providers/boardProvider/useBoardState';

export const postLogin = async ({
  email,
  password,
}: IPostLogin): Promise<ICustomResponse | void> => {
  try {
    setUserLoading(true);
    const response = await apiHandler<Record<string, string>>({
      method: IApiMethod.POST,
      url: ApiCalls.AUTH,
      payload: {
        email,
        password,
      },
    });

    if (
      response.isError ||
      !response?.payload?.token ||
      response instanceof Error
    ) {
      throw response;
    }
    Cookies.set(AUTH_TOKEN, response.payload.token, {
      expires: 7,
    });
    setUserLoading(false);
  } catch (err) {
    setUserLoading(false);
    return err as ICustomResponse;
  }
};

export const getProtected = async (): Promise<void> => {
  setUserLoading(true);
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
      if (response instanceof Error || response.isError) {
        throw response;
      }
      if (response.isSuccess) {
        setLoginUser(true);
        setUserLoading(false);
      }
    } catch (err) {
      logout();
      setUserLoading(false);
    }
  }
};

export const logout = (): void => {
  setLoginUser(false);
  resetBoardList();
  Cookies.remove(AUTH_TOKEN);
};
