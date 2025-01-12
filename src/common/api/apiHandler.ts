import axios from 'common/api/axios';
import { IApiHandler } from 'common/interfaces/IApiHandler';
import CustomError from './error';
import { AxiosError } from 'axios';

interface IError {
  response: { data: CustomError };
}

const apiHandler = async ({ method, url, payload }: IApiHandler) => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
    });
    return response.data;
  } catch (err: any) {
    const customError = new CustomError(
      (err as IError).response.data.message,
      ...(err as IError).response.data.message
    );
    return customError;
  }
};

export default apiHandler;
