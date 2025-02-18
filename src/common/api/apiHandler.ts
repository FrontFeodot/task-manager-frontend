import axios from 'common/api/axios';
import { IApiHandler } from 'common/interfaces/IApiHandler';
import CustomError from './error';
import Cookies from 'js-cookie';
import { AUTH_TOKEN } from '@common/utils/cookies';
import { AxiosError } from 'axios';

interface IError {
  response: { data: CustomError };
}

const apiHandler = async <T>({
  method,
  url,
  payload,
  withAuth,
}: IApiHandler): Promise<CustomError | T> => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
      ...(withAuth
        ? { headers: { Authorization: Cookies.get(AUTH_TOKEN) } }
        : {}),
    });
    return response.data;
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      const customError = new CustomError(
        (err as IError).response.data.message,
        ...(err as IError).response.data.message
      );
      return customError;
    }
    return new CustomError(err.message);
  }
};

export default apiHandler;
