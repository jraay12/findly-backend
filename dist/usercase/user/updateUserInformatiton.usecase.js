"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserInformationUsecase = void 0;
class UpdateUserInformationUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(user_id, data) {
        return await this.userRepository.updateUserInformation(user_id, data);
    }
}
exports.UpdateUserInformationUsecase = UpdateUserInformationUsecase;
