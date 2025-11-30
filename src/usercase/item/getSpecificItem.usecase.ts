import { UserItem } from "../../domain/item.entity";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";
export class GetSpecificItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(item_id: number) {
    return await this.itemRepository.findItemById(item_id);
  }
}
