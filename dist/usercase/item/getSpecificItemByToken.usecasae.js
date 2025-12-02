"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSpecificItemByTokenUsecase = void 0;
class GetSpecificItemByTokenUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(token) {
        const item = await this.itemRepository.findItemByToken(token);
        if (!item)
            return null;
        // Only allow access if QR download is allowed
        if (!item.allow_download_image) {
            throw new Error("Not allowed to access this item");
        }
        return item;
    }
}
exports.GetSpecificItemByTokenUsecase = GetSpecificItemByTokenUsecase;
