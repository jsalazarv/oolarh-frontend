import BaseService from "@/services/BaseService";
import {
  IApplicant,
  IApplicantQueryParams,
} from "@/services/ApplicantService/types";
import { INoContentResponse, IPaginatedResponse } from "@/services/types";

export default class ApplicantService extends BaseService {
  getAll(query: IApplicantQueryParams): IPaginatedResponse<Array<IApplicant>> {
    return this.client.get("/applicants", query);
  }

  delete(applicant: IApplicant): INoContentResponse {
    return this.client.delete<void>(`/applicants/${applicant.id}`);
  }
}
