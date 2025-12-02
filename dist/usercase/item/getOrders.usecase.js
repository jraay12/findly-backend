"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrdersUsecase = void 0;
class GetOrdersUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute() {
        // Retrieve all items from repository
        const orders = await this.itemRepository.getOrders();
        return { orders };
    }
}
exports.GetOrdersUsecase = GetOrdersUsecase;
