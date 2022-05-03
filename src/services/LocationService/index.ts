import BaseService from "@/services/BaseService";
import { IPaginatedResponse, IPlainResponse } from "@/services/types";
import { ICity, ICountry, IState } from "@/services/LocationService/types";

export default class LocationService extends BaseService {
  getCountries(): IPaginatedResponse<Array<ICountry>> {
    return this.client.get("/locations/countries");
  }

  getStates(country: Partial<ICountry>): IPlainResponse<Array<IState>> {
    return this.client.get(`/locations/countries/${country}/states`);
  }

  getCities(
    country: Partial<ICountry>,
    state: Partial<IState>
  ): IPlainResponse<Array<ICity>> {
    return this.client.get(
      `/locations/countries/${country}/states/${state}/cities`
    );
  }
}
