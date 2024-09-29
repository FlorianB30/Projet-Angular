export interface User {
  id: string | null;
  name: string;
  email: string;
  password: string | null;
  friends: string[];
}

export interface Users extends Array<User>{}

export interface Item {
  id: string | null;
  name: string;
  description: string;
  price: number;
}

export interface Items extends Array<Item>{}

export interface List {
  id: string | null;
  name: string;
  idUser: string | null;
  items: Items
  shared: boolean;
}
export interface Lists extends Array<List>{}