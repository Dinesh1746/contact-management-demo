export interface contact {
  id?: number;
  firstname: string;
  lastname: string;
  phonenumber: string;
  city: string;
}

export interface signup {
  name: string;
  email: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}