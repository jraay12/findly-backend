import { UserRepository } from "../../infrastructure/repositories/user.repository";

export class UpdateUserInformationUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(user_id: number, data: any) {
    return await this.userRepository.updateUserInformation(user_id, data);
  }
}
