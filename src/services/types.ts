export interface IApiResponse<T, M = string> {
  data: T;
  meta: T;
}

export type IServiceResponse<T = unknown, M = string> = Promise<
  IApiResponse<T, M>
>;
