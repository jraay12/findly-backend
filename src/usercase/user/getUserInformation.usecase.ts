import { UserRepository } from "../../infrastructure/repositories/user.repository";

export class GetUserInformationUsecase {
  constructor(private userRepository: UserRepository) {}
  async execute(user_id: number) {
    return await this.userRepository.getUserById(user_id);
  }
}
