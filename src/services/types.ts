import { AxiosResponse } from "axios";

export interface ILinks {
  first: string;
  last: string;
  next: string;
  prev: string;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface IApiPaginateResponse<T, L, M> {
  data: T;
  links: L;
  meta: M;
}

export interface IApiPlainResponse<T> {
  data: T;
}

export type IPaginatedResponse<T, L = ILinks, M = IMeta> = Promise<
  IApiPaginateResponse<T, L, M>
>;

export type IPlainResponse<T> = Promise<IApiPlainResponse<T>>;

export type INoContentResponse = Promise<AxiosResponse<void>>;

export interface IQueryParams extends Record<string, unknown> {
  query?: string;
  page?: number;
  per_page?: number;
}

export interface IHeaders {
  text: string;
  value: string;
  align?: string;
  sortable: boolean;
}

export interface ILanguage {
  flag: string;
  name: string;
  img: string;
}
