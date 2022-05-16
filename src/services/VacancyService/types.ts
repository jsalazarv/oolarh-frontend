import { IQueryParams } from "@/services/types";
import { IJob } from "@/services/JobService/types";
import { IBranchOffices } from "@/services/BranchOfficesService/types";
import { IDepartment } from "@/services/DepartmentService/types";

export interface IVacancy {
  id: number | null;
  name: string;
  description: string;
  salary: string;
  branch_office: IBranchOffices;
  department: IDepartment;
  job: IJob;
}

export interface IVacancyRequest {
  id?: number | null;
  name?: string;
  description?: string;
  salary?: string;
  branch_office_id?: number | null;
  department_id?: number | null;
  job_id?: number | null;
}

export type IVacanciesQueryParams = IQueryParams;
