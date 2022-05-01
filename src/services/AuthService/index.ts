import BaseService from "@/services/BaseService";
import {
  ILogin,
  ILoginResponse,
  ILogoutResponse,
} from "@/services/AuthService/types";
import { IPlainResponse } from "@/services/types";

export default class AuthService extends BaseService {
  login(data: ILogin): IPlainResponse<ILoginResponse> {
    return this.client.post(`/auth/login`, data);
  }

  logout(): Promise<ILogoutResponse> {
    return this.client.post(`/auth/logout`);
  }
}
