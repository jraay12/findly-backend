import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { User } from "../../domain/user.entity";
import { CreateUserDTO } from "../../domain/dto/createUser.dto";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const {
      email,
      password,
      role,
      first_name,
      last_name,
      contact_number,
      address,
    } = data;

    if (!email || !password || !role || !first_name || !last_name)
      throw new Error("Missing required fields");

    const existingEmail = await this.userRepository.findUserByEmail(email);

    if (existingEmail) {
      throw new Error("Email already exist");
    }

    // Create user in repository
    const created = await this.userRepository.create({
      ...data,
    });

    const user: User = {
      id: created.id,
      email: created.email,
      password: created.password,
      role: created.role,
      status: created.status,
      created_by: created.created_by ?? undefined,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
      userInformation: {
        first_name: created.user_information!.first_name,
        middle_name: created.user_information!.middle_name ?? undefined,
        last_name: created.user_information!.last_name,
        contact_number: created.user_information!.contact_number ?? undefined,
        address: created.user_information!.address ?? undefined,
      },
    };

    return user;
  }
}
