import { IQueryParams } from "@/services/types";

export interface IVacancy {
  id: number | null;
  name: string;
  description: string;
  salary: string;
  branch_office: {
    id: number | null;
    name: string;
  }; //TODO: Replace with the Branch Offices interface
  department: {
    id: number | null;
    name: string;
  }; //TODO: Replace with the Departments interface
  job: {
    id: number | null;
    name: string;
    description: string;
  }; //TODO: Replace with the Jobs interface
}

export type IVacancyQueryParams = IQueryParams;
