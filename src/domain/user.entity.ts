export interface User {
  id?: number;
  email: string;
  password: string;
  status?: boolean | null;
  created_by?: number | null;
  role: string | null;
  createdAt?: Date;
  updatedAt?: Date;

  userInformation: UserInformation;
}

export class UserInformation {
  id?: number;
  first_name!: string;
  middle_name?: string;
  last_name!: string;
  contact_number?: string;
  address?: string;
  created_by?: number;
  updated_by?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
