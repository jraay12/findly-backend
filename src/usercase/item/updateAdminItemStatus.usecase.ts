import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class UpdateAdminItemStatusUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(id: number) {
    const item = await this.itemRepository.findAdminItemById(id);
    if (!item) throw new Error("Item not found");

    await this.itemRepository.updateAdminItemStatus(id);

    return { message: "Successufully delete", success: true };
  }
}
