import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class UpdateUserItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(data: any, item_id: number) {
    const item = await this.itemRepository.findItemById(item_id);

    if (!item) throw new Error("Item not found");
    // Create item in repository
    return await this.itemRepository.updateUserItem({ ...data }, item_id);
  }
}
