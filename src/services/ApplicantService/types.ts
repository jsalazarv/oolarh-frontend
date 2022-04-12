import { IQueryParams } from "@/services/types";

interface IResume {
  id: number | null;
  url: string;
  path: string;
  file_name: string;
}

export interface IApplicant {
  id: number | null;
  names: string;
  vacancy: number;
  first_surname: string;
  second_surname: string;
  email: string;
  cellphone: string;
  psychometric_test: string;
  resume: IResume;
  status: string;
}

export type IApplicantQueryParams = IQueryParams;
