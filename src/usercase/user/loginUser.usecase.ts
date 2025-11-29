import { UserRepository } from "../../infrastructure/repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";
import { LoginUserDTO } from "../../domain/dto/loginUser.dto";

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: LoginUserDTO) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    if (!user?.email_verify) {
      throw new Error("Email is not yet verified, please check you email for verification");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { token };
  }
}
