import { IQueryParams } from "@/services/types";

export interface IEmployee {
  id: number | null;
  names: string;
  fullName: string;
  vacancy: number | null;
  first_surname: string;
  second_surname: string;
  email: string;
  cellphone: string;
  psychometric_test: string;
  status: string | null;
}

export type IEmployeeQueryParams = IQueryParams;
