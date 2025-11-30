import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class UpdateStatusUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(user_id: number, item_id: number, status: string) {
    const item = await this.itemRepository.findItemById(item_id);

    if (!item) throw new Error("Item not found");
    // Create item in repository
    return await this.itemRepository.updateItemStatus(item_id, user_id, status);
  }
}
