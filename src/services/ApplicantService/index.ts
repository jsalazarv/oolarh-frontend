import BaseService from "@/services/BaseService";
import {
  IApplicant,
  IApplicantQueryParams,
} from "@/services/ApplicantService/types";
import { IPaginatedResponse } from "@/services/types";

export default class ApplicantService extends BaseService {
  getAll(query: IApplicantQueryParams): IPaginatedResponse<Array<IApplicant>> {
    return this.client.get("/applicants", query);
  }
}
