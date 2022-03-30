import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IDepartment } from "@/services/DepartmentService/types";

export default class WorkplaceService extends BaseService {
  getAll(): IServiceResponse<Array<IDepartment>> {
    return this.client.get("/departments");
  }

  create(department: IDepartment) {
    console.log("SERVICE", department);
    return this.client.post(`/departments`, department);
  }
}
