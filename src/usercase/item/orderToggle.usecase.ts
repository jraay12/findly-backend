import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class OrderToggleUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(id: number) {
    // Retrieve lost items from repository
    const order = await this.itemRepository.orderToggleStatus(id);
    return { success: true, order };
  }
}
