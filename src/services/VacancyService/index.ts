import BaseService from "@/services/BaseService";
import { IPaginatedResponse } from "@/services/types";
import { IVacancy, IVacancyQueryParams } from "@/services/VacancyService/types";

export default class VacancyService extends BaseService {
  getAll(query: IVacancyQueryParams): IPaginatedResponse<Array<IVacancy>> {
    return this.client.get("/vacancies", query);
  }
}
