import { IQueryParams } from "@/services/types";
import { IVacancy } from "@/services/VacancyService/types";

export interface IEmployee {
  id: number | null;
  names: string;
  fullName: string;
  vacancy_id: number | null;
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
  //branch_office: string;
  //employee_number: number | null;
  salary: string;
}

export interface IResume {
  id: number | null;
  url: string;
  path: string;
  file_name: string;
}

export interface IContact {
  id: number | null;
  email: string;
  phone: string;
  cellphone: string;
}

export interface IAddress {
  id: number | null;
  country: string;
  state: string;
  municipality: string;
  suburb: string;
  street: string;
  outdoor_number: string;
  interior_number: string;
  postal_code: number | null;
}

export interface IEmployeeResponse {
  id: number | null;
  names: string;
  first_surname: string;
  second_surname: string;
  fullName: string;
  birthday: string;
  gender: string;
  rfc: string;
  ssn: string;
  resume: IResume;
  contact: IContact;
  address: IAddress;
  vacancy: IVacancy;
  psychometric_test: string;
  salary: string;
  employee_status: string;
  profile_status: string;
}

export type IEmployeeQueryParams = IQueryParams;
