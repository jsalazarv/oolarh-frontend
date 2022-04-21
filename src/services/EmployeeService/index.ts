import BaseService from "@/services/BaseService";
import {
  IEmployee,
  IEmployeeQueryParams,
} from "@/services/EmployeeService/types";
import { INoContentResponse, IPaginatedResponse } from "@/services/types";

export default class EmployeeService extends BaseService {
  getAll(query: IEmployeeQueryParams): IPaginatedResponse<Array<IEmployee>> {
    return this.client.get("/employees", query);
  }

  delete(employee: IEmployee): INoContentResponse {
    return this.client.delete<void>(`/employees/${employee.id}`);
  }
}
