"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusUsecase = void 0;
class UpdateStatusUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(user_id, item_id, status) {
        const item = await this.itemRepository.findItemById(item_id);
        if (!item)
            throw new Error("Item not found");
        // Create item in repository
        return await this.itemRepository.updateItemStatus(item_id, user_id, status);
    }
}
exports.UpdateStatusUsecase = UpdateStatusUsecase;
