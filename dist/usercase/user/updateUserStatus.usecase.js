"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeactivateUserUseCase = void 0;
class DeactivateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ id, status }) {
        if (!id) {
            throw new Error("User ID is required");
        }
        if (status === undefined) {
            throw new Error("Status is required");
        }
        await this.userRepository.setUserStatus(id, status);
    }
}
exports.DeactivateUserUseCase = DeactivateUserUseCase;
