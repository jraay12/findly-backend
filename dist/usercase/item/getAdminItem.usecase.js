"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAdminItemUsecase = void 0;
class GetAdminItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute() {
        // Retrieve all items from repository
        return await this.itemRepository.getAdminItems();
    }
}
exports.GetAdminItemUsecase = GetAdminItemUsecase;
