import BaseService from "@/services/BaseService";
import { INoContentResponse, IPaginatedResponse } from "@/services/types";
import {
  IVacanciesQueryParams,
  IVacancy,
} from "@/services/VacancyService/types";

export default class VacancyService extends BaseService {
  getAll(query: IVacanciesQueryParams): IPaginatedResponse<Array<IVacancy>> {
    return this.client.get("/vacancies", query);
  }

  delete(id: number): INoContentResponse {
    return this.client.delete<void>(`/vacancies/${id}`);
  }
}
