import BaseService from "@/services/BaseService";
import { INoContentResponse, IPaginatedResponse } from "@/services/types";
import {
  IBranchOffices,
  IBranchOfficesQueryParams,
} from "@/services/BranchOfficesService/types";

export default class BranchOfficesService extends BaseService {
  getAll(
    query: IBranchOfficesQueryParams
  ): IPaginatedResponse<Array<IBranchOffices>> {
    return this.client.get("/branch-offices", query);
  }

  delete(branchOffices: IBranchOffices): INoContentResponse {
    return this.client.delete<void>(`/branch-offices/${branchOffices.id}`);
  }
}
