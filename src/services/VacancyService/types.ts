import { IJob } from "@/services/JobService/types";
import { IQueryParams } from "@/services/types";

export interface IVacancy {
  id: number | null;
  name: string;
  description: string;
  salary: string;
  branch_office: number | null;
  department: number | null;
  job: IJob;
}

export interface IVacancyRequest {
  id: number | null;
  name: string;
  description: string;
  salary: string;
  branch_office_id: number | null;
  department_id: number | null;
  job_id: number | null;
}

export type IVacanciesQueryParams = IQueryParams;
