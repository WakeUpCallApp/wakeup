export interface User {
  email: string;
  password: string;
  name?: string;
  _id?;
}

export interface Token {
  token: string;
}
