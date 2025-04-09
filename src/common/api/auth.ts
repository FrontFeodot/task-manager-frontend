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
  setUserLoading,
} from '@common/providers/userProvider/useUserState';
import { IPostLogin } from '@common/interfaces/IAuth';
import { resetBoardList } from '@common/providers/boardProvider/useBoardState';

export const postLogin = async (
  payload: IPostLogin
): Promise<ICustomResponse<Record<string, string>>> => {
  try {
    setUserLoading(true);
    const response = await apiHandler<Record<string, string>, IPostLogin>({
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
    setUserLoading(false);
    return response as ICustomResponse<Record<string, string>>;
  } catch (err) {
    setUserLoading(false);
    return err as ICustomResponse<Record<string, string>>;
  }
};

export const getProtected = async (): Promise<void> => {
  const token = Cookies.get(AUTH_TOKEN);

  if (!token) {
    return setUserLoading(false);
  }
  try {
    const response = await apiHandler<
      Record<string, string>,
      { token: string }
    >({
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
  } catch {
    logout();
    setUserLoading(false);
    return;
  }
};

export const logout = (): void => {
  setLoginUser(false);
  resetBoardList();
  Cookies.remove(AUTH_TOKEN);
};
