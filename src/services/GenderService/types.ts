import { IQueryParams } from "@/services/types";

export interface IGender {
  id?: number | null;
  name?: string;
}

export type IGenderQueryParams = IQueryParams;
