export interface User {
  name: string;
  email: string;
  password: string | null;
}

export interface Users extends Array<User>{}

