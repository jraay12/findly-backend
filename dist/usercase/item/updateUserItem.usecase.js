"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserItemUsecase = void 0;
class UpdateUserItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(data, item_id) {
        const item = await this.itemRepository.findItemById(item_id);
        if (!item)
            throw new Error("Item not found");
        // Create item in repository
        const payload = {
            item_name: data.item_name,
            status: data.status,
            item_description: data.item_description,
            updated_by: data.updated_by,
        };
        return await this.itemRepository.updateUserItem(payload, item_id);
    }
}
exports.UpdateUserItemUsecase = UpdateUserItemUsecase;
