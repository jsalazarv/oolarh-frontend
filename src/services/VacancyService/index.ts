import BaseService from "@/services/BaseService";
import {
  INoContentResponse,
  IPaginatedResponse,
  IPlainResponse,
} from "@/services/types";
import {
  IVacanciesQueryParams,
  IVacancy,
  IVacancyRequest,
} from "@/services/VacancyService/types";

export default class VacancyService extends BaseService {
  getAll(query: IVacanciesQueryParams): IPaginatedResponse<Array<IVacancy>> {
    return this.client.get("/vacancies", query);
  }

  create(vacancy: IVacancyRequest): IPlainResponse<IVacancy> {
    return this.client.post(`/vacancies`, vacancy);
  }

  delete(id: number): INoContentResponse {
    return this.client.delete<void>(`/vacancies/${id}`);
  }
}
