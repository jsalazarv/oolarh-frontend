export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
}
