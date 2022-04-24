import BaseService from "@/services/BaseService";
import { IPlainResponse } from "@/services/types";
import { IGender, IGenderQueryParams } from "@/services/GenderService/types";

export default class GenderService extends BaseService {
  getAll(query: IGenderQueryParams = {}): IPlainResponse<Array<IGender>> {
    return this.client.get("/genders", query);
  }
}
