import BaseService from "@/services/BaseService";
import {
  IEmployee,
  IEmployeeQueryParams,
} from "@/services/EmployeeService/types";
import { IPaginatedResponse } from "@/services/types";

export default class EmployeeService extends BaseService {
  getAll(query: IEmployeeQueryParams): IPaginatedResponse<Array<IEmployee>> {
    return this.client.get("/employees", query);
  }
}
