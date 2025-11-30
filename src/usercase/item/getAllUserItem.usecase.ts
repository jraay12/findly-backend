import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class GetAllUserItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(user_id: number) {
    // Retrieve all items from repository
    const items = await this.itemRepository.getAllItem(user_id);

    // Apply business rule: hide QR image if not allowed
    const result = items.map((item) => ({
      ...item,
      qr_image_url: item.allow_download_image ? item.qr_image_url : null,
    }));

    return result;
  }
}