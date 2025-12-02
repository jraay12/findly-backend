"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmail = void 0;
class VerifyEmail {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(token) {
        const user = await this.userRepository.findByEmailToken(token);
        if (!user) {
            throw new Error("Invalid or expired token");
        }
        await this.userRepository.verifyUser(user.id);
        return user;
    }
}
exports.VerifyEmail = VerifyEmail;
