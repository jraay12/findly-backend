"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserUsercase = void 0;
class GetUserUsercase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        return await this.userRepository.getUsers();
    }
}
exports.GetUserUsercase = GetUserUsercase;
