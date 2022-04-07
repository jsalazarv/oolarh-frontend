import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IDepartment } from "@/services/DepartmentService/types";

export default class WorkplaceService extends BaseService {
  getAll(query = {}): IServiceResponse<Array<IDepartment>> {
    return this.client.get("/departments", query);
  }

  create(department: IDepartment) {
    return this.client.post(`/departments`, department);
  }

  update(department: IDepartment) {
    return this.client.put(`/departments/${department.id}`, department);
  }

  delete(department: IDepartment) {
    return this.client.delete(`/departments/${department.id}`);
  }
}
