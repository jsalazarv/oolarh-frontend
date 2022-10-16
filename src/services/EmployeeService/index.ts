import BaseService from "@/services/BaseService";
import {
  IEmployee,
  IEmployeeQueryParams,
  IEmployeeRequest,
  IEmployeeResponse,
} from "@/services/EmployeeService/types";
import {
  INoContentResponse,
  IPaginatedResponse,
  IPlainResponse,
} from "@/services/types";
import { serialize } from "object-to-formdata";

export default class EmployeeService extends BaseService {
  getAll(query: IEmployeeQueryParams): IPaginatedResponse<Array<IEmployee>> {
    return this.client.get("/employees", query);
  }

  create(employee: IEmployeeRequest): IPlainResponse<IEmployeeResponse> {
    const body = serialize(employee, { indices: true });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return this.client.post(`/employees`, body, config);
  }

  findById(id: string, params = {}): IPlainResponse<IEmployeeResponse> {
    return this.client.get(`/employees/${id}/`, params);
  }

  update(
    id: number | null,
    payload: IEmployeeRequest
  ): IPlainResponse<IEmployeeResponse> {
    const body = serialize({ ...payload, _method: "PUT" }, { indices: true });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return this.client.post(`/employees/${id}`, body, config);
  }

  delete(employee: IEmployee): INoContentResponse {
    return this.client.delete<void>(`/employees/${employee.id}`);
  }
}
