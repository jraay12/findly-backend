"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminItemStatusUsecase = void 0;
class UpdateAdminItemStatusUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(id) {
        const item = await this.itemRepository.findAdminItemById(id);
        if (!item)
            throw new Error("Item not found");
        await this.itemRepository.updateAdminItemStatus(id);
        return { message: "Successufully delete", success: true };
    }
}
exports.UpdateAdminItemStatusUsecase = UpdateAdminItemStatusUsecase;
