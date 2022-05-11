import { IQueryParams } from "@/services/types";

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

export interface IBranchOffices {
  id: number | null;
  name: string;
  contact: IContact;
  address: IAddress;
}

export type IBranchOfficesQueryParams = IQueryParams;
