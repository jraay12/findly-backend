import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class GetAdminItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute() {
    // Retrieve all items from repository
    return await this.itemRepository.getAdminItems();
  }
}
