import { UserRepository } from "../../infrastructure/repositories/user.repository";

export class VerifyEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string) {
    const user = await this.userRepository.findByEmailToken(token);

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    await this.userRepository.verifyUser(user.id);

    return user;
  }
}
