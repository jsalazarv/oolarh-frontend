import BaseService from "@/services/BaseService";
import {
  IApplicant,
  IApplicantQueryParams,
  IApplicantRequest,
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

  create(applicant: IApplicantRequest): IPlainResponse<IApplicant> {
    const body = serialize(applicant, { indices: true });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.client.post(`/applicants`, body, config);
  }

  findById(id: string, params = {}): IPlainResponse<IApplicant> {
    return this.client.get(`/applicants/${id}/`, params);
  }

  update(
    id: number | null,
    payload: Partial<IUpdateApplicant>
  ): IPlainResponse<IApplicant> {
    const body = serialize({ ...payload, _method: "PUT" }, { indices: true });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return this.client.post(`/applicants/${id}`, body, config);
  }

  delete(applicant: IApplicantRequest): INoContentResponse {
    return this.client.delete<void>(`/applicants/${applicant.id}`);
  }
}
