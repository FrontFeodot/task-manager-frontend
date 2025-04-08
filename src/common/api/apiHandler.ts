import Cookies from 'js-cookie';
import { AxiosError, AxiosResponse } from 'axios';

import axios from '@common/api/axios';
import { IApiHandler, ICustomResponse } from '@common/interfaces/IApiHandler';
import { AUTH_TOKEN } from '@common/utils/cookies';

const apiHandler = async <Res, Req = undefined>({
  method,
  url,
  payload,
  withAuth,
}: IApiHandler<Req>): Promise<ICustomResponse<Res>> => {
  try {
    const response: AxiosResponse = await axios({
      method,
      url,
      data: payload,
      ...(withAuth
        ? { headers: { Authorization: Cookies.get(AUTH_TOKEN) } }
        : {}),
    });

    const { data } = response;

    if (!data || response instanceof Error) {
      throw { isError: 1, message: 'Server side issue' } as ICustomResponse;
    }

    if (data?.isError) {
      throw data;
    }

    return data as ICustomResponse<Res>;
  } catch (err) {
    if (err instanceof AxiosError && err?.response?.data?.isError) {
      console.error(err);
      return err.response?.data;
    }

    console.error('Unhandled error: ', err);

    return {
      isError: 1,
      message: 'Unhandled error',
      payload: err,
    } as ICustomResponse<Res>;
  }
};

export default apiHandler;
