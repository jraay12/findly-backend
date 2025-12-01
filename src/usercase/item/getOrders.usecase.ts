import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class GetOrdersUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute() {
    // Retrieve all items from repository
    const orders = await this.itemRepository.getOrders();

    return { orders };
  }
}
