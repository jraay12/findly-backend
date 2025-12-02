"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInformationUsecase = void 0;
class GetUserInformationUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(user_id) {
        return await this.userRepository.getUserById(user_id);
    }
}
exports.GetUserInformationUsecase = GetUserInformationUsecase;
