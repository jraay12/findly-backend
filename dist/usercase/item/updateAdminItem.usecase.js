"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminItemUsecase = void 0;
class UpdateAdminItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(id, data) {
        const item = await this.itemRepository.findAdminItemById(id);
        if (!item)
            throw new Error("Item not found");
        const result = await this.itemRepository.updateAdminItem(id, data);
        return { result, success: true };
    }
}
exports.UpdateAdminItemUsecase = UpdateAdminItemUsecase;
