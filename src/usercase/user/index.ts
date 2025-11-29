import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { CreateUserUseCase } from "./createUser.usercase";
import { GetUserUsercase } from "./getUser.usercase";
import { LoginUserUseCase } from "./loginUser.usecase";
import { DeactivateUserUseCase } from "./updateUserStatus.usecase";

const userRepository = new UserRepository();

export const createUserUseCase = new CreateUserUseCase(userRepository);
export const getUserUseCase = new GetUserUsercase(userRepository);
export const loginUserUseCase = new LoginUserUseCase(userRepository);
export const deactivateUserUseCase = new DeactivateUserUseCase(userRepository);