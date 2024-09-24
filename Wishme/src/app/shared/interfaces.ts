export interface User {
  id: string | null;
  name: string;
  email: string;
  password: string | null;
}

export interface Users extends Array<User>{}

export interface Item {
  id: string | null;
  name: string;
  description: string;
  price: number;
}

export interface Items extends Array<Item>{}