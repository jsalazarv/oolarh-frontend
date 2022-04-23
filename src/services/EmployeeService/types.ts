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

export interface IEmployeeRequest
  extends Omit<IEmployee, "id" | "fullName" | "status"> {
  birthday: string;
  gender: string;
  rfc: string;
  ssn: string;
  resume?: File | null;
  phone: string;
  country: string;
  state: string;
  municipality: string;
  suburb: string;
  street: string;
  outdoor_number: string;
  interior_number: string;
  postal_code: string;
}

export type IEmployeeQueryParams = IQueryParams;
