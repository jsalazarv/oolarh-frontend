import { IQueryParams } from "@/services/types";

export interface IJob {
  id?: number | null;
  name?: string;
}

export type IJobQueryParams = IQueryParams;
