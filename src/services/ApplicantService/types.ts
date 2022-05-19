import { IQueryParams } from "@/services/types";
import { IVacancy } from "@/services/VacancyService/types";

export interface IStatus {
  text: string;
  color: string;
}

export interface IStatusListItem {
  text: string;
  status: string;
}

export type IStatuses = Record<string, IStatus>;

export interface IResume {
  id: number | null;
  url: string;
  path: string;
  file_name: string;
}

export interface IApplicant {
  id: number | null;
  names: string;
  fullName?: string;
  vacancy: IVacancy;
  first_surname: string;
  second_surname: string;
  email: string;
  cellphone: string;
  psychometric_test: string;
  resume: IResume | null;
  status?: string;
}

export interface IApplicantRequest {
  id: number | null;
  names: string;
  fullName?: string;
  vacancy_id: number | null;
  first_surname: string;
  second_surname: string;
  email: string;
  cellphone: string;
  psychometric_test: string;
  resume: IResume | null;
  status?: string;
}

export interface IUpdateApplicant
  extends Omit<IApplicantRequest, "resume" | "id"> {
  resume?: File | null;
}

export interface IIsLoading extends IApplicant {
  isLoading?: boolean;
}

export type IApplicantQueryParams = IQueryParams;
