import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class UpdateAdminItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(id: number, data: any) {
    const item = await this.itemRepository.findAdminItemById(id);
    if (!item) throw new Error("Item not found");

    const result = await this.itemRepository.updateAdminItem(id, data);

    return { result, success: true };
  }
}
