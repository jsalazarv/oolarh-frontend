import { IAppState } from "@/store/app/types";
import { IUserStore } from "@/store/user/types";

export interface IRootState {
  app: IAppState;
  user: IUserStore;
}
