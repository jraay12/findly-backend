"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUserItemUsecase = void 0;
class GetAllUserItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(user_id) {
        // Retrieve all items from repository
        const items = await this.itemRepository.getAllItem(user_id);
        // Apply business rule: hide QR image if not allowed
        const result = items.map((item) => ({
            ...item,
            qr_image_url: item.allow_download_image ? item.qr_image_url : null,
        }));
        return result;
    }
}
exports.GetAllUserItemUsecase = GetAllUserItemUsecase;
