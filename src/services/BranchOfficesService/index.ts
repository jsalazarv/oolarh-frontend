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

export default class BranchOfficesService extends BaseService {
  getAll(
    query: IBranchOfficesQueryParams
  ): IPaginatedResponse<Array<IBranchOffices>> {
    return this.client.get("/branch-offices", query);
  }

  create(data: IBranchOfficesRequest): IPlainResponse<IBranchOfficesRequest> {
    return this.client.post(`/branch-offices`, data);
  }

  findById(id: string, params = {}): IPlainResponse<IBranchOffices> {
    return this.client.get(`/branch-offices/${id}/`, params);
  }

  update(
    id: number,
    data: IBranchOfficesRequest
  ): IPlainResponse<IBranchOffices> {
    return this.client.put(`/branch-offices/${id}`, data);
  }

  delete(id: number): INoContentResponse {
    return this.client.delete<void>(`/branch-offices/${id}`);
  }
}
