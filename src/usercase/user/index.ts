import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { CreateUserUseCase } from "./createUser.usercase";
import { GetUserUsercase } from "./getUser.usercase";
import { LoginUserUseCase } from "./loginUser.usecase";
import { DeactivateUserUseCase } from "./updateUserStatus.usecase";
import { SendVerificationEmail } from "./sendVerificationEmail.usecase";
import { NodemailerService } from "../../infrastructure/email/NodeMailerService";
import { VerifyEmail } from "./verifyEmail.usecase";
import { GetUserInformationUsecase } from "./getUserInformation.usecase";
import { UpdateUserInformationUsecase } from "./updateUserInformatiton.usecase";
// Initialize repository and mailer
const userRepository = new UserRepository();
const nodemailerService = new NodemailerService();

// Initialize use case for sending verification email
const sendVerificationEmailUseCase = new SendVerificationEmail(
  nodemailerService,
  userRepository
);

// Export use cases
export const createUserUseCase = new CreateUserUseCase(
  userRepository,
  sendVerificationEmailUseCase
);
export const getUserUseCase = new GetUserUsercase(userRepository);
export const loginUserUseCase = new LoginUserUseCase(userRepository);
export const deactivateUserUseCase = new DeactivateUserUseCase(userRepository);
export const verifyEmail = new VerifyEmail(userRepository);
export const getUserInformationUsecase = new GetUserInformationUsecase(userRepository);
export const updateUserInformationUsecase = new UpdateUserInformationUsecase(userRepository);


export const sendVerificationEmail = sendVerificationEmailUseCase; // export if needed elsewhere
