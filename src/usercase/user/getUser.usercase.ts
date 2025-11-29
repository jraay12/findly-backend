import { UserRepository } from "../../infrastructure/repositories/user.repository";

export class GetUserUsercase {
    constructor(private userRepository: UserRepository) {}
    async execute(){
        return await this.userRepository.getUsers();
    }
}