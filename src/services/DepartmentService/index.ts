import BaseService from "@/services/BaseService";
import {
  INoContentResponse,
  IPaginatedResponse,
  IPlainResponse,
} from "@/services/types";
import {
  IDepartment,
  IDepartmentQueryParams,
} from "@/services/DepartmentService/types";

export default class WorkplaceService extends BaseService {
  getAll(
    query: IDepartmentQueryParams = {}
  ): IPaginatedResponse<Array<IDepartment>> {
    const config = {
      headers: { Accept: "application/xml" },
    };

    return this.client.get("/departments", query, config);
  }

  create(department: IDepartment): IPlainResponse<IDepartment> {
    return this.client.post(`/departments`, department);
  }

  update(department: IDepartment): IPlainResponse<IDepartment> {
    return this.client.put(`/departments/${department.id}`, department);
  }

  delete(department: IDepartment): INoContentResponse {
    return this.client.delete<void>(`/departments/${department.id}`);
  }
}
