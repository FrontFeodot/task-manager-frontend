import Cookies from 'js-cookie';
import { AxiosResponse } from 'axios';

import axios from 'common/api/axios';
import { IApiHandler, ICustomResponse } from 'common/interfaces/IApiHandler';
import { AUTH_TOKEN } from '@common/utils/cookies';

const apiHandler = async <T>({
  method,
  url,
  payload,
  withAuth,
}: IApiHandler): Promise<ICustomResponse<T>> => {
  try {
    const response: AxiosResponse = await axios({
      method,
      url,
      data: payload,
      ...(withAuth
        ? { headers: { Authorization: Cookies.get(AUTH_TOKEN) } }
        : {}),
    });
    console.log('apiHandler response', response);

    const { data } = response;

    if (!data || response instanceof Error) {
      throw { isError: 1, message: 'Server side issue' } as ICustomResponse;
    }

    if (data?.isError) {
      throw data;
    }

    return data as ICustomResponse<T>;
  } catch (err) {
    console.log(err);

    return err as ICustomResponse<T>;
  }
};

export default apiHandler;
