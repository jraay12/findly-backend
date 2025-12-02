"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, password }) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        if (!user?.email_verify) {
            throw new Error("Email is not yet verified, please check you email for verification");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, env_1.JWT_SECRET, { expiresIn: "24h" });
        return { token, role: user.role };
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
