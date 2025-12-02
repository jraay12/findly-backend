"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserLostItemUsecase = void 0;
class GetUserLostItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(user_id) {
        // Retrieve lost items from repository
        const items = await this.itemRepository.getLostItem(user_id);
        // Apply business rule: hide QR image if not allowed
        const result = items.map((item) => ({
            ...item,
            qr_image_url: item.allow_download_image ? item.qr_image_url : null,
        }));
        return result;
    }
}
exports.GetUserLostItemUsecase = GetUserLostItemUsecase;
