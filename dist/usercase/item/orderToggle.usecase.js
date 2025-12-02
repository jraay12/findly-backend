"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderToggleUsecase = void 0;
class OrderToggleUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(id) {
        // Retrieve lost items from repository
        const order = await this.itemRepository.orderToggleStatus(id);
        return { success: true, order };
    }
}
exports.OrderToggleUsecase = OrderToggleUsecase;
