import { IAppState } from "@/store/app/types";
import { IUserStore } from "@/store/user/types";
import { IAuthState } from "@/store/auth/types";

export interface IRootState {
  app: IAppState;
  auth: IAuthState;
  user: IUserStore;
}
