import { IQueryParams } from "@/services/types";

export interface IStatus {
  text: string;
  color: string;
}

export interface IStatusListItem {
  text: string;
  status: string;
}

export type IStatuses = Record<string, IStatus>;

interface IResume {
  id: number | null;
  url: string;
  path: string;
  file_name: string;
}

export interface IApplicant {
  id: number | null;
  names: string;
  fullName?: string;
  vacancy: number | null;
  first_surname: string;
  second_surname: string;
  email: string;
  cellphone: string;
  psychometric_test: string;
  resume: IResume | null;
  status?: string;
}

export type IApplicantQueryParams = IQueryParams;
