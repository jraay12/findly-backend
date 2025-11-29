import { UserRepository } from "../../infrastructure/repositories/user.repository";

export class DeactivateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({id, status}: {id: number, status: boolean}): Promise<void> {
    if (!id) {
      throw new Error("User ID is required");
    }

    if (status === undefined) {
      throw new Error("Status is required");
    }

    await this.userRepository.setUserStatus(id, status);
  }
}
