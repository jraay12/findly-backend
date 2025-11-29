export interface CreateUserDTO {
  email: string;
  password: string;
  role: string;

  first_name: string;
  middle_name?: string;
  last_name: string;
  contact_number?: string;
  address?: string;
}
