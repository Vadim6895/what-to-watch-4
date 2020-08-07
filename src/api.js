import axios from "axios";
import history from "./history.js";
import {URL, Error, AppRout} from "./const.js";

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: URL.BASE,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      if (response.config.url !== AppRout.LOGIN) {
        history.push(AppRout.LOGIN);
      }
      err.isAuthError = true;
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
