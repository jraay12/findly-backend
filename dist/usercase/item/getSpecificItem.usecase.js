"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSpecificItemUsecase = void 0;
class GetSpecificItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(item_id) {
        // Retrieve the item from the repository
        const item = await this.itemRepository.findItemById(item_id);
        // Apply business rule: hide QR image if not allowed
        if (!item)
            return null;
        return {
            ...item,
            qr_image_url: item.allow_download_image ? item.qr_image_url : null,
        };
    }
}
exports.GetSpecificItemUsecase = GetSpecificItemUsecase;
