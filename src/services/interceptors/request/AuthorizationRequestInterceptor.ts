import { AxiosRequestConfig } from "axios";

import { IRequestInterceptor } from "@/services/interceptors/types";
import store from "@/store";

const AuthorizationRequestInterceptor: IRequestInterceptor = async (
  config: AxiosRequestConfig
) => {
  const type = store.state.auth.access.token_type;
  const token = store.state.auth.access.access_token;
  config.headers.Authorization = `${type} ${token}`;

  return config;
};

export default AuthorizationRequestInterceptor;
