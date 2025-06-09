import { ApiCalls, IApiMethod } from '@common/interfaces/IApiHandler';
import apiHandler from './apiHandler';

const pingApi = async (): Promise<string> => {
  try {
    const response = await apiHandler({
      method: IApiMethod.GET,
      url: ApiCalls.PING,
    });

    if (!response || response.isError) {
      throw response;
    }
    return 'success';
  } catch (e) {
    console.error(e);
    return 'Server is not responding, please reload page or try again later';
  }
};

export default pingApi;
