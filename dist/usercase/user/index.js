"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = exports.updateUserInformationUsecase = exports.getUserInformationUsecase = exports.verifyEmail = exports.deactivateUserUseCase = exports.loginUserUseCase = exports.getUserUseCase = exports.createUserUseCase = void 0;
const user_repository_1 = require("../../infrastructure/repositories/user.repository");
const createUser_usercase_1 = require("./createUser.usercase");
const getUser_usercase_1 = require("./getUser.usercase");
const loginUser_usecase_1 = require("./loginUser.usecase");
const updateUserStatus_usecase_1 = require("./updateUserStatus.usecase");
const sendVerificationEmail_usecase_1 = require("./sendVerificationEmail.usecase");
const NodeMailerService_1 = require("../../infrastructure/email/NodeMailerService");
const verifyEmail_usecase_1 = require("./verifyEmail.usecase");
const getUserInformation_usecase_1 = require("./getUserInformation.usecase");
const updateUserInformatiton_usecase_1 = require("./updateUserInformatiton.usecase");
// Initialize repository and mailer
const userRepository = new user_repository_1.UserRepository();
const nodemailerService = new NodeMailerService_1.NodemailerService();
// Initialize use case for sending verification email
const sendVerificationEmailUseCase = new sendVerificationEmail_usecase_1.SendVerificationEmail(nodemailerService, userRepository);
// Export use cases
exports.createUserUseCase = new createUser_usercase_1.CreateUserUseCase(userRepository, sendVerificationEmailUseCase);
exports.getUserUseCase = new getUser_usercase_1.GetUserUsercase(userRepository);
exports.loginUserUseCase = new loginUser_usecase_1.LoginUserUseCase(userRepository);
exports.deactivateUserUseCase = new updateUserStatus_usecase_1.DeactivateUserUseCase(userRepository);
exports.verifyEmail = new verifyEmail_usecase_1.VerifyEmail(userRepository);
exports.getUserInformationUsecase = new getUserInformation_usecase_1.GetUserInformationUsecase(userRepository);
exports.updateUserInformationUsecase = new updateUserInformatiton_usecase_1.UpdateUserInformationUsecase(userRepository);
exports.sendVerificationEmail = sendVerificationEmailUseCase; // export if needed elsewhere
