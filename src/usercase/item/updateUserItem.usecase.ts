import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class UpdateUserItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(data: any, item_id: number) {
    const item = await this.itemRepository.findItemById(item_id);

    if (!item) throw new Error("Item not found");
    // Create item in repository

    const payload = {
      item_name: data.item_name,
      status: data.status,
      item_description: data.item_description,
      updated_by: data.updated_by,
    };
    return await this.itemRepository.updateUserItem(payload, item_id);
  }
}
