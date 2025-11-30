import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class GetSpecificItemByTokenUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(token: string) {
    const item = await this.itemRepository.findItemByToken(token);

    if (!item) return null;

    // Only allow access if QR download is allowed
    if (!item.allow_download_image) {
      throw new Error("Not allowed to access this item");
    }

    return item;
  }
}
