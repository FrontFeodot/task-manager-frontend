import axios from 'common/api/axios';
import { IApiHandler } from 'common/interfaces/IApiHandler';

const apiHandler = async ({ method, url, payload }: IApiHandler) => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default apiHandler;
