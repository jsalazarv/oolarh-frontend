import { IQueryParams } from "@/services/types";

export interface IDepartment {
  id?: number | null;
  name: string;
}

export type IDepartmentQueryParams = IQueryParams;
