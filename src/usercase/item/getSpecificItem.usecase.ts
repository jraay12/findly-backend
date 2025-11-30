import { UserItem } from "../../domain/item.entity";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class GetSpecificItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(item_id: number) {
    // Retrieve the item from the repository
    const item = await this.itemRepository.findItemById(item_id);

    // Apply business rule: hide QR image if not allowed
    if (!item) return null;

    return {
      ...item,
      qr_image_url: item.allow_download_image ? item.qr_image_url : null,
    };
  }
}
