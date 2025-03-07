import { isArray } from 'lodash';

export const removeSearchParam = (payload: string | string[]): void => {
  const url = window.location.href;
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;

  if (isArray(payload)) {
    payload.forEach((key) => searchParams.delete(key));
  } else {
    searchParams.delete(payload);
  }

  urlObject.search = searchParams.toString();

  window.history.replaceState(null, '', urlObject.toString());
};
