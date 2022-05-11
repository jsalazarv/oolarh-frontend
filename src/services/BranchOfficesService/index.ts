import BaseService from "@/services/BaseService";
import { IPaginatedResponse } from "@/services/types";
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
}
