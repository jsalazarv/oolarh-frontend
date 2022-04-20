import BaseService from "@/services/BaseService";
import {
  IApplicant,
  IApplicantQueryParams,
  IUpdateApplicant,
} from "@/services/ApplicantService/types";
import {
  INoContentResponse,
  IPaginatedResponse,
  IPlainResponse,
} from "@/services/types";
import { serialize } from "object-to-formdata";

export default class ApplicantService extends BaseService {
  getAll(query: IApplicantQueryParams): IPaginatedResponse<Array<IApplicant>> {
    return this.client.get("/applicants", query);
  }

  create(applicant: IApplicant): IPlainResponse<IApplicant> {
    const body = serialize(applicant, { indices: true });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.client.post(`/applicants`, body, config);
  }

  update(
    id: number | null,
    payload: Partial<IUpdateApplicant>
  ): IPlainResponse<IApplicant> {
    return this.client.put(`/applicants/${id}`, payload);
  }

  delete(applicant: IApplicant): INoContentResponse {
    return this.client.delete<void>(`/applicants/${applicant.id}`);
  }
}
