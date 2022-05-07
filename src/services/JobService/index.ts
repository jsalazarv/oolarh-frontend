import BaseService from "@/services/BaseService";
import {
  INoContentResponse,
  IPaginatedResponse,
  IPlainResponse,
} from "@/services/types";
import { IJob, IJobQueryParams } from "@/services/JobService/types";

export default class JobService extends BaseService {
  getAll(query: IJobQueryParams = {}): IPaginatedResponse<Array<IJob>> {
    return this.client.get("/jobs", query);
  }

  create(job: IJob): IPlainResponse<IJob> {
    return this.client.post(`/jobs`, job);
  }

  update(job: IJob): IPlainResponse<IJob> {
    return this.client.put(`/jobs/${job.id}`, job);
  }

  delete(job: IJob): INoContentResponse {
    return this.client.delete<void>(`/jobs/${job.id}`);
  }
}
