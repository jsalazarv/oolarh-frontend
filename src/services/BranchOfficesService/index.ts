import BaseService from "@/services/BaseService";
import {
  INoContentResponse,
  IPaginatedResponse,
  IPlainResponse,
} from "@/services/types";
import {
  IBranchOffices,
  IBranchOfficesQueryParams,
  IBranchOfficesRequest,
} from "@/services/BranchOfficesService/types";
import { serialize } from "object-to-formdata";

export default class BranchOfficesService extends BaseService {
  getAll(
    query: IBranchOfficesQueryParams
  ): IPaginatedResponse<Array<IBranchOffices>> {
    return this.client.get("/branch-offices", query);
  }

  create(
    branchOffices: IBranchOfficesRequest
  ): IPlainResponse<IBranchOfficesRequest> {
    const body = serialize(branchOffices, { indices: true });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.client.post(`/branch-offices`, body, config);
  }

  delete(branchOffices: IBranchOffices): INoContentResponse {
    return this.client.delete<void>(`/branch-offices/${branchOffices.id}`);
  }
}
